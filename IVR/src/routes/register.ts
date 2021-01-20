import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import jwt from 'jsonwebtoken';
const {Merchant, buildMerchant} = require("../models/merchant")

const registerRouter = express.Router();


registerRouter.get('/registerUser', (request, response) => {
    const { RecordingSid, RecordingUrl } = request.query;

    const fileName = `${RecordingSid}.wav`;

    const file = require('fs').createWriteStream(fileName);

    const r = https.get(RecordingUrl, async (r) => {
        r.pipe(file).on('finish', async () => {
            //file.close(cb);  // close() is async, call cb after close completes.


            // Reads a local audio file and converts it to base64
            const file = await fs.readFile(fileName);
            const audioBytes = file.toString('base64');

            // The audio file's encoding, sample rate in hertz, and BCP-47 language code
            const audio = {
                content: audioBytes,
            };
            const config = {
                languageCode: 'en-US',
            };
            const request = {
                audio: audio,
                config: config,
            };

            // Detects speech in the audio file
            const [res] = await client.recognize(request);
            const transcription = res.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            console.log(`Transcription: ${transcription}`);
            addMessage(transcription, transcription);

            const customerName = capitalizeFirstLetter(transcription);

            var customersRef = db.ref(`customers/${storeId}/${customerPhoneNumber}`);
            customersRef.set({
                status: "ON",
                avatar: "http://gravatar.com/avatar/15ef5bd18c36ed4a2b8e582022117d97?d=identicon",
                phoneNumber: customerPhoneNumber,
                name: customerName,
                timestamp: admin.database.ServerValue.TIMESTAMP,
            });

            let rspMsg = `My name is ${store.name} a service representative`;

            const twiml = new VoiceResponse();

            // twiml.dial(s.val().phoneNumber);
            // twiml.say('Goodbye');

            twiml.say({ voice: 'alice' }, `Hi ${customerName}!`);
            twiml.say({ voice: 'alice' }, 'How can I help you today?\npress the star key when finished.');

            addMessage("IVRobot", `Welcome back ${customer.name} to ${store.storeName}`)
            addMessage("IVRobot", 'How can I help you today?')
            addMessage("IVRobot", 'press the star key when finished.')


            twiml.record({
                action: '/inquery',
                method: 'GET',
                maxLength: 20,
                finishOnKey: '*'
            });

            response.type('text/xml');
            response.send(twiml.toString());


        }).on('error', function (err) { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            if (cb) cb(err.message);
        });
    });
})

export { registerRouter }
