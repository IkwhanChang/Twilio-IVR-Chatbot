import express, { Request, Response } from 'express'
import * as IVR from '../cache';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { addMessage } from '../util';

const welcomeRouter = express.Router();
const twiml = new VoiceResponse();

welcomeRouter.post('/welcome', (req: Request, res: Response) => {

    const { From: customerNumber } = req.body;

    const merchant = IVR.currentMerchant.get(customerNumber) || null
    const customer = merchant?.customers.find(c => c.phoneNumber == customerNumber) || null
    const END_MESSAGE = 'press the star key when finished.'
    
    if (customer !== null) {
        console.log(`found customer: ${customer.name}`)
        
        const says = [
            `Welcome back ${customer.name} to ${merchant?.storeName}`,
            'How can I help you today?',
        ]

        says.forEach(say => {
            twiml.say({voice: 'alice'}, say);
            addMessage("IVRobot", say)    
        })

        twiml.say({voice: 'alice'}, END_MESSAGE);

        twiml.record({
            action: '/inquery',
            method: 'GET',
            maxLength: 20,
            finishOnKey: '*',
            timeout: 10,
            transcribe: true
        });

        res.type('text/xml');
        res.send(twiml.toString());
    } else {

        const says = [
            `Welcome to ${merchant?.storeName}`,
            'Please say your name at the beep and press the star key when finished.',
        ]

        says.forEach(say => {
            twiml.say({voice: 'alice'}, say);
            addMessage("IVRobot", say)    
        })

        twiml.record({
            action: '/registerUser',
            method: 'GET',
            maxLength: 20,
            finishOnKey: '*',
            timeout: 10,
            transcribe: true
        });

        // Render the response as XML in reply to the webhook request
        res.type('text/xml');
        res.send(twiml.toString());
    }

});

export { welcomeRouter }
