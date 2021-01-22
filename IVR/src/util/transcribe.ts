import * as fs from 'fs';
import speech from "@google-cloud/speech";
import { HttpClient } from "typed-rest-client/HttpClient";

const client = new speech.SpeechClient();
const httpClient = new HttpClient("clientTest");


export const getTranscribeByUrl = (url: string, fileName: string, filePath: string) => new Promise<string>(async (resolve, reject) => {
    {
        // 1. Record User Name (provided by Twilio)

        const response = await httpClient.get(url);
        const file: NodeJS.WritableStream = fs.createWriteStream(filePath); // 2. Download recorded file

        if (response.message.statusCode !== 200) {
            reject({ code: response.message.statusCode, message: `Unexpected HTTP response: ${response.message.statusCode}` });
        }

        file.on("error", (err) => reject({ code: 400, message: "File download error" }));

        // 3. Transcribe with recorded file through Speech-to-Text API
        const stream = response.message.pipe(file);
        stream.on("close", () => {
            try {
                fs.readFile(filePath, async (error, f) => {
                    const audioBytes = f.toString('base64');

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

                                        resolve(transcription)

                                    }
                                } else {
                                    reject({code: 400, message: "transcribe error"})
                                }
                            } else {
                                reject({code: 400, message: "transcribe error"})
                            }

                        } else {
                            reject({code: 400, message: "transcribe error"})
                        }

                    } catch (e) {
                        reject({code: 400, message: e})
                    }
                });
            } catch (err) {
                reject({code: 400, message: err})
            }
        });
    }
})