import express, { Request, Response } from 'express'
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import * as IVR from '../cache';

const voiceRouter = express.Router();


voiceRouter.post("/voice", (req: Request, res: Response) => {
    const { To, From } = req.body;
    const merchant = IVR.merchants.find(m => m.twilioPhoneNumber == To) || null;
    const twiml = new VoiceResponse();
    if (merchant !== null) {
        IVR.currentMerchant.set(From, merchant) // Set merchant info to the map

        twiml.redirect("/welcome")
        res.type('text/xml');
        res.send(twiml.toString());
    } else {
        twiml.say({ voice: 'man' }, "Sorry, we can't find the store. Good Bye")
        res.type('text/xml');
        res.send(twiml.toString());
    }


})

export { voiceRouter }
