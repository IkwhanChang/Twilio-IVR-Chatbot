import { model, Schema, Model, Document } from 'mongoose';
interface IItem extends Document {
    name: string,
    stock: number,
    startDate: Date
}
const itemSchema:Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  })

const Item: Model<IItem> = model('Item', itemSchema);

export {IItem, itemSchema, Item}