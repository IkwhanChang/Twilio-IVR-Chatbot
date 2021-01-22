import axios from 'axios';
import express, { Request, Response } from 'express'
import * as IVR from '../cache';
import { addMessage, toTitleCase } from '../util/util';
import { Customer } from '../models/customer';
import { ENDPOINT_URI } from '../config';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { getTranscribeByUrl } from '../util/transcribe';


const registerRouter = express.Router();


registerRouter.get('/registerUser', async (req: Request, res: Response) => {
    const { RecordingSid, RecordingUrl, From: customerNumber, To: storePhoneNumber } = req.query as { RecordingSid: string, RecordingUrl: string, From: string, To: string };
    //console.log(RecordingUrl)
    const merchant = IVR.currentMerchant.get(customerNumber) || null

    // 1. Record User Name (provided by Twilio)
    const fileName = `${customerNumber}.wav`;
    const filePath = `${__dirname}/../../tmp/${fileName}`;

    getTranscribeByUrl(RecordingUrl, fileName, filePath).then(async (transcription) => {
        const customerName = toTitleCase(transcription);
        const _customer = {
            name: customerName,
            phoneNumber: customerNumber,
            email: merchant?.email
        }

        try {
            const response_merchant = await axios.post<Customer>(`${ENDPOINT_URI}api/merchant/customer`, _customer);
            merchant?.customers.push(new Customer({
                name: customerName,
                phoneNumber: customerNumber,
                messages: []
            }))

            const twiml = new VoiceResponse();

            const says = [
                `Hi ${customerName}!`,
                `My name is ${merchant?.name} a service representative`,
                "How can I help you today?",
            ]

            says.forEach(say => {
                twiml.say({ voice: 'man' }, say);
                addMessage("IVRobot", say)
            })

            twiml.record({
                action: '/inquery',
                method: 'GET',
                maxLength: 20,
                finishOnKey: '*',
                timeout: 10,
            });

            res.type('text/xml');
            res.send(twiml.toString());
        } catch (e) {
            console.error(e)
            res.send(400)
        }
    });
})

export { registerRouter }
