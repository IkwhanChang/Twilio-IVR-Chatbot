import { model, Schema, Model, Document } from 'mongoose';
import {IItem} from './item';

interface IPromotion extends Document {
    startDate: Date,
    endDate: Date,
    itemId: IItem,
    discount: number,
    timestamp: Date
}

const promotionSchema: Schema = new Schema({
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    itemId: {
        type: { type: Schema.Types.ObjectId, ref: 'Item' }
    },
    //Unit is percentage off. 100 means free. 10 means 10% off, etc.
    discount: {
        type: Number,
        required: false
    }
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

const Promotion: Model<IPromotion> = model('Promotion', promotionSchema);

export {IPromotion, promotionSchema, Promotion}