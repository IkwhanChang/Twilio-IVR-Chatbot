import Axios from 'axios';
import express, { Request, Response } from 'express'
import https from "https";
import * as fs from 'fs';
import speech from "@google-cloud/speech";
import { HttpClient } from "typed-rest-client/HttpClient";
import * as IVR from '../cache';
import { google } from '@google-cloud/speech/build/protos/protos';
import { toTitleCase } from '../util';

const client = new speech.SpeechClient();
const httpClient = new HttpClient("clientTest");
const registerRouter = express.Router();


registerRouter.get('/registerUser', async (req: Request, res: Response) => {
    const { RecordingSid, RecordingUrl, From, To } = req.query as { RecordingSid: string, RecordingUrl: string, From: string, To: string };


    const fileName = `${From}.wav`;
    const filePath = `${__dirname}/../../tmp/${fileName}`;
    console.log(filePath)

    const response = await httpClient.get(RecordingUrl);
    const file: NodeJS.WritableStream = fs.createWriteStream(filePath);

    if (response.message.statusCode !== 200) {
        const err: Error = new Error(`Unexpected HTTP response: ${response.message.statusCode}`);
        //err["httpStatusCode"] = response.message.statusCode;
        res.status(400)
        throw err;
    }

    file.on("error", (err) => res.status(400));

    const stream = response.message.pipe(file);
    stream.on("close", () => {
        try {
            console.log("here")
            //resolve(__dirname + "/tmp");
            fs.readFile(filePath, async (error, f) => {
                const audioBytes = f.toString('base64');

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

                try {
                    const [response] = await client.recognize(request);
                    if (response.results !== undefined && response.results !== null) {
                        if (response.results.length > 0) {
                            if (response.results[0].alternatives !== undefined && response.results[0].alternatives !== null && response.results[0].alternatives.length > 0) {
                                if (response.results[0].alternatives[0].transcript !== undefined && response.results[0].alternatives[0].transcript !== null) {
                                    const transcription: string = response.results[0].alternatives[0].transcript

                                    const customerName = toTitleCase(transcription);

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
                                }
                            } else {
                                console.log("transcript error")
                            }
                        } else {
                            console.log("transcript error")
                        }

                    } else {
                        console.log("transcript error")
                    }

                } catch (e) {
                    console.log(e)
                }
            });
        } catch (err) {
            //reject(err);
            console.error(err)
        }
    });

    // const file = require('fs').createWriteStream(fileName);

    // const r = https.get(RecordingUrl, async (r) => {
    //     r.pipe(file).on('finish', async () => {
    //         //file.close(cb);  // close() is async, call cb after close completes.
    //         // Reads a local audio file and converts it to base64
    //         fs.readFile(fileName, async (error, file) => {
    //             const audioBytes = file.toString('base64');

    //             // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    //             const audio = {
    //                 content: audioBytes,
    //             };

    //             const config = {
    //                 languageCode: 'en-US',
    //             };
    //             const request = {
    //                 audio: audio,
    //                 config: config,
    //             };

    //             // Detects speech in the audio file
    //             const [res] = await client.recognize(request);
    //             const transcription = res.results?.map(result => {
    //                 //result.alternatives?[0].transcript
    //                 console.log(result.alternatives)
    //             })
    //             //     .join('\n');
    //             // console.log(`Transcription: ${transcription}`);
    //             // addMessage(transcription, transcription);

    //             // const customerName = capitalizeFirstLetter(transcription);

    //             // var customersRef = db.ref(`customers/${storeId}/${customerPhoneNumber}`);
    //             // customersRef.set({
    //             //     status: "ON",
    //             //     avatar: "http://gravatar.com/avatar/15ef5bd18c36ed4a2b8e582022117d97?d=identicon",
    //             //     phoneNumber: customerPhoneNumber,
    //             //     name: customerName,
    //             //     timestamp: admin.database.ServerValue.TIMESTAMP,
    //             // });

    //             // let rspMsg = `My name is ${store.name} a service representative`;

    //             // const twiml = new VoiceResponse();

    //             // // twiml.dial(s.val().phoneNumber);
    //             // // twiml.say('Goodbye');

    //             // twiml.say({ voice: 'alice' }, `Hi ${customerName}!`);
    //             // twiml.say({ voice: 'alice' }, 'How can I help you today?\npress the star key when finished.');

    //             // addMessage("IVRobot", `Welcome back ${customer.name} to ${store.storeName}`)
    //             // addMessage("IVRobot", 'How can I help you today?')
    //             // addMessage("IVRobot", 'press the star key when finished.')


    //             // twiml.record({
    //             //     action: '/inquery',
    //             //     method: 'GET',
    //             //     maxLength: 20,
    //             //     finishOnKey: '*'
    //             // });

    //             // response.type('text/xml');
    //             // response.send(twiml.toString());
    //         });



    //     }).on('error', function (err) { // Handle errors
    //         fs.unlink(dest); // Delete the file async. (But we don't check the result)
    //         if (cb) cb(err.message);
    //     });
    // });
})

export { registerRouter }
