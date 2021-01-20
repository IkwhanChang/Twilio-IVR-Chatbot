import express, {Request, Response} from 'express'
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse'
import Cache from '../cache';

const speech = require('@google-cloud/speech');
const fs = require('fs').promises;
const https = require('https');
const inqueryRouter = express.Router();
const client = new speech.SpeechClient();

const twiml = new VoiceResponse();

inqueryRouter.get('/inquery', (request:Request, response:Response) => {

  const { RecordingSid, RecordingUrl } = request.query;

  const fileName = `${RecordingSid}.wav`;

  const file = require('fs').createWriteStream(fileName);

  const r = https.get(RecordingUrl, async (r: { pipe: (arg0: any) => { (): any; new(): any; on: { (arg0: string, arg1: () => Promise<void>): void; new(): any; }; }; }) => {
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
              .map((result: { alternatives: { transcript: any; }[]; }) => result.alternatives[0].transcript)
              .join('\n');
          console.log(`Transcription: ${transcription}`);
          addMessage(Cache.get("CUSTOMER").name, transcription);

          // Logic
          let output = "";
          let mode = -1;
          const msg = transcription;
          const currentDate = new Date()

          const MENU_REGEX = /menu/
          const PROMO_REGEX = /discount|promotion/
          const STORE_HOUR_REGEX = /open|close/
          const INVENTORY_REGEX = /have.+in/

          if (MENU_REGEX.test(msg)) {
              output = "I've sent our store menu to your cell phone via message."
              mode = 1;
          } else if (PROMO_REGEX.test(msg)) {

              let promotions: string[] = []
              output = store.promotions.length === 0 ? "Sorry, we have no promotions at this time" : "Right now we have "
              store.promotions.map((promotion: { startDate: string | number | Date; endDate: string | number | Date; discount: number; item: string; }) => {
                  if (currentDate > new Date(promotion.startDate) && currentDate < new Date(promotion.endDate)) {
                      let promoString = ""
                      if (promotion.discount === 100) {
                          promoString += "free "
                      } else {
                          promoString += `${promotion.discount}% off `
                      }
                      promoString += promotion.item
                      promotions.push(promoString)
                  }
              })
              output += promotions.join(", ")
              mode = 2;
          } else if (STORE_HOUR_REGEX.test(msg)) {
              const dayOfWeek = currentDate.getDay()
              if (dayOfWeek in store.storeHours) {
                  const h = store.storeHours[dayOfWeek]
                  output = `Our store is open from ${convert24hrTo12hr(h.startHour)} to ${convert24hrTo12hr(h.endHour)} today.`
              } else {
                  output = "Our store is closed."
              }
              mode = 3;
          } else if (INVENTORY_REGEX.test(msg)) {

              let promotions: string[] = []

              store.items.map((item: { name: { toLowerCase: () => { (): any; new(): any; split: { (arg0: string): { (): any; new(): any;[x: string]: any; }; new(): any; }; }; }; stock: number; }) => {
                  // if (currentDate > new Date(promotion.startDate) && currentDate < new Date(promotion.endDate)) {

                  for (var iname in item.name.toLowerCase().split(" ")) {
                      console.log(msg, item.name.toLowerCase().split(" ")[iname], msg.includes(item.name.toLowerCase().split(" ")[iname]))
                      if (msg.includes(item.name.toLowerCase().split(" ")[iname])) {
                          let promoString = `We have ${item.name} at our store.`

                          if (item.stock <= 0) {
                              promoString += " but it seems out of stock. Sorry";
                          }

                          promotions.push(promoString)
                          break;
                      }
                  }

              })
              output += promotions.join(", ")
              if (promotions.length === 0) output = "Sorry, we have no that item at this time"
              mode = 4;
          }
          if (output === "") {
              output = "I'll route your inquiry to our store representative."
              //twiml.dial(s.val().phoneNumber)

          }

          
          //twiml.say('Please leave a message at the beep.\nPress the star key when finished.');
          //twiml.say(`${output}\n'Is there anything that I can help you today?'`);
          //addMessage("IVRobot", output);
          if (mode !== -1) {
              twiml.say(`${output}\n'Is there anything that I can help you today?'`);
              addMessage("IVRobot", 'Is there anything that I can help you today?');

              twiml.record({
                  action: '/inquery',
                  method: 'GET',
                  maxLength: 20,
                  finishOnKey: '*'
              });
          } else {
              twiml.say(output);
              twiml.dial(store.phoneNumber)
              
          }


          console.log(twiml.toString());



          // Render the response as XML in reply to the webhook request
          response.type('text/xml');
          response.send(twiml.toString());

      });

  }).on('error', function (err: { message: any; }) { // Handle errors
      fs.unlink(file); // Delete the file async. (But we don't check the result)
      //if (cb) cb(err.message);
  });

});

export {inqueryRouter}