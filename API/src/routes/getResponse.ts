import express, { Request, Response } from "express";
import axios from "axios";

const { Merchant } = require("../models/merchant");

const getResponseRouter = express.Router();

const convert24hrTo12hr = (hour: number) => {
	if (hour >= 12) {
		return hour - 12 + "pm";
	} else {
		return hour + "am";
	}
};

getResponseRouter.post("/getResponse", async (req: Request, res: Response) => {
	const currentDate = new Date();

	const MENU_REGEX = /menu/;
	const PROMO_REGEX = /discount|promotion/;
	const STORE_HOUR_REGEX = /open|close|hour|hours/;
	const INVENTORY_REGEX = /have.+/;
	const { input, email } = req.body;
	let output = "I'll route your inquiry to our store representative.";
	const merchant = await Merchant.findOne({ email });

	console.log("Guest Inquery: " + input);

	if (MENU_REGEX.test(input)) {
		output = "I've sent our store menu to your cell phone via message.";
	} else if (PROMO_REGEX.test(input)) {
		output = "Right now we have ";
		let promotions: string[] = [];
		merchant.promotions.map((promotion: any) => {
			if (
				currentDate > new Date(promotion.startDate) &&
				currentDate < new Date(promotion.endDate)
			) {
				let promoString = "";
				if (promotion.discount === 100) {
					promoString += "free ";
				} else {
					promoString += `${promotion.discount}% off `;
				}
				promoString += promotion.item;
				promotions.push(promoString);
			}
		});
		output += promotions.join(", ");
	} else if (STORE_HOUR_REGEX.test(input)) {
		const dayOfWeek = currentDate.getDay();
		const hours = merchant.storeHours.find(
			(hours: any) => hours.dayOfWeek === dayOfWeek
		);
		if (!hours) {
			output = "Our store is closed.";
		} else {
			output = `Our store is open from ${convert24hrTo12hr(
				hours.startHour
			)} to ${convert24hrTo12hr(hours.endHour)} today.`;
		}
	} else if (INVENTORY_REGEX.test(input)) {
		const nlpServerUrl = process.env.NLP_SERVER_URL || "http://localhost:3007/api/nlp/parse/noun";
		try {
      output = "We have "
			const nlpResponse = await axios.get(nlpServerUrl, {
				data: { text: input },
      });
      const firstSentenceNouns: string[] = nlpResponse.data[0]
      const inventory = merchant.inventory.filter((item: string) => firstSentenceNouns.reduce((acc, itr) => acc && item.includes(itr), true))
      if(inventory.length !== 0){
        inventory.map((i: string) => output += i + " and ")
        output = output.substring(0, output.length - 5)
      }else{
        output = "Sorry, we don't have the item you asked about."
      }
      console.log(inventory);
      
		} catch (error) {
			console.error(error);
		}
	}
	console.log("Store Reply: " + output);
	res.status(200).send({
		response: output,
	});
});

export { getResponseRouter };
