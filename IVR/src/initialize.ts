import axios from 'axios';
import { ENDPOINT_URI, ADMIN_TOKEN } from './config';
import { merchants, currentMerchant } from './cache';
import { Merchant } from './models/merchant';

axios.defaults.headers.common['Authorization'] = ADMIN_TOKEN;

async function initialize() {
	// Get Stores

	const response = await axios.get<Array<Merchant>>(`${ENDPOINT_URI}api/merchants`);
	//merchants = _merchants;
	response.data.forEach(m => {
		//console.log(typeof(merchants))
		const merchant = new Merchant(m)
		merchants.push(merchant)

	});

	console.log("Merchants Loaded");//, JSON.stringify(merchants));

}

export { initialize };
