import {IMerchant} from "./models/merchant"

const merchants: Array<IMerchant> = new Array<IMerchant>();
let currentMerchant: Map<string, IMerchant> = new Map<string, IMerchant>();

export {merchants, currentMerchant}
