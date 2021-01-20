import {model, Schema, Model, Document} from 'mongoose';
interface IStoreHour extends Document {
    startHour: number,
    endHour: number,
    dayOfWeek: string,
    timestamps: Date
}

const storeHourSchema = new Schema({
    startHour: {
        type: Number,
        required: false
    },
    endHour: {
        type: Number,
        required: false
    },
    dayOfWeek: {
        type: String,
        required: false
    }
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  })

const StoreHour: Model<IStoreHour> = model('StoreHour', storeHourSchema)

export {IStoreHour, StoreHour}