import { model, Schema, Model, Document } from 'mongoose';
import { IMessage } from './message';
interface ICustomer extends Document {
    name: string,
    phoneNumber: string,
    messages: Array<IMessage>
}
const customerScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  })

const Customer: Model<ICustomer> = model('Customer', customerScheme)


export {ICustomer, Customer}