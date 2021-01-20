import {model, Schema, Model, Document} from 'mongoose';
import { ICustomer } from './customer';
import { IItem } from './item';
import { IPromotion } from './promotion';
import { IStoreHour } from './storeHour';

interface IMerchant extends Document {
    username: string,
    email: string,
    name: string,
    password: string,
    storeName: string,
    menuLink: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipcode: string,
    phoneNumber: string,
    twilioPhoneNumber: string,
    customers: Array<ICustomer>,
    storeHours: Array<IStoreHour>,
    promotions: Array<IPromotion>,
    items: Array<IItem>
}

const merchantSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    menuLink: {
        type: String,
        required: false
    },
    address1: {
        type: String,
        required: false
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    twilioPhoneNumber: {
        type: String,
        required: false
    },
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }],
    storeHours: [{
        type: Schema.Types.ObjectId,
        ref: 'StoreHour'
    }],
    promotions: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

const Merchant: Model<IMerchant> = model('Merchant', merchantSchema)

export {IMerchant, Merchant}