import express, {Request, Response} from 'express'
import * as IVR from '../cache';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse'
import { getTranscribeByUrl } from '../util/transcribe';
import {addMessage, convert24hrTo12hr} from '../util/util'

const speech = require('@google-cloud/speech');
const fs = require('fs').promises;
const https = require('https');
const inqueryRouter = express.Router();
const client = new speech.SpeechClient();



inqueryRouter.get('/inquery', async (req:Request, res:Response) => {
    const { RecordingSid, RecordingUrl, From: customerNumber, To: storePhoneNumber } = req.query as { RecordingSid: string, RecordingUrl: string, From: string, To: string };
    //console.log(RecordingUrl)
    const merchant = IVR.currentMerchant.get(customerNumber)

    // 1. Record User Name (provided by Twilio)
    const fileName = `${customerNumber}.wav`;
    const filePath = `${__dirname}/../../tmp/${fileName}`;

    const twiml = new VoiceResponse();

    if(merchant !== null && merchant !== undefined){
        getTranscribeByUrl(RecordingUrl, fileName, filePath).then(async (transcription) => {
            console.log(`Customer inquery: ${transcription}`)

            // Logic
            let says = [];
            let inquired = true;
            const msg = transcription;
            const currentDate = new Date()
    
            const MENU_REGEX = /menu/
            const PROMO_REGEX = /discount|promotion/
            const STORE_HOUR_REGEX = /open|close/
            const INVENTORY_REGEX = /have.+in/
            
            if (MENU_REGEX.test(msg)) {
                says.push("I've sent our store menu to your cell phone via message.")
            } else if (PROMO_REGEX.test(msg)) {
                const promotions: string[] = []
                
                says.push(merchant.promotions.length === 0 ? "Sorry, we have no promotions at this time" : "Right now we have ")
                
                // find promotions
                merchant.promotions.forEach(promotion => {
                    if (currentDate > new Date(promotion.startDate) && currentDate < new Date(promotion.endDate)) {
                        let promoString = ""
                        if (promotion.discount === 100) {
                            promoString += "free "
                        } else {
                            promoString += `${promotion.discount}% off `
                        }
                        promoString += merchant.items.find(item => item.id === promotion.itemId)?.name
                        promotions.push(promoString)
                    }
                })
                says.push(promotions.join(", "))
            } else if (STORE_HOUR_REGEX.test(msg)) {
                const dayOfWeek = currentDate.getDay()
                if (dayOfWeek in merchant.storeHours) {
                    const h = merchant.storeHours[dayOfWeek]
                    says.push(`Our store is open from ${convert24hrTo12hr(h.startHour)} to ${convert24hrTo12hr(h.endHour)} today.`)
                } else {
                    says.push("Our store is closed.")
                }
            } else if (INVENTORY_REGEX.test(msg)) {
    
                let inventories: string[] = []
    
                merchant.items.forEach((item) => {
                    const items = item.name.toLowerCase().split(" ")
                    items.forEach(_item => {
                        if (msg.includes(_item)) {
                            let promoString = `We have ${item.name} at our store.`
    
                            if (item.stock <= 0) {
                                promoString += " but it seems out of stock. Sorry";
                            }
    
                            inventories.push(promoString)
                        }
                    })
    
                })
                says.push(inventories.join(", "))
                if (inventories.length === 0) says.push("Sorry, we have no that item at this time")
            }else{
                says.push("I'll route your inquiry to our store representative.")
                inquired = false
            }
            if (inquired) {
                says.push('Is there anything that I can help you today?')

                says.forEach(say => {
                    twiml.say({ voice: 'man' }, say);
                    addMessage("IVRobot", say)
                })
                says = []
                console.log(twiml.toString())
                
                twiml.record({
                    action: '/inquery',
                    method: 'GET',
                    maxLength: 20,
                    finishOnKey: '*'
                });

            } else {
                twiml.say(says[0]);
                says = []
                twiml.dial(merchant.phoneNumber)
            }
            // Render the response as XML in reply to the webhook request
            res.type('text/xml');
            res.send(twiml.toString());
        });
    
    }
    

});

export {inqueryRouter}