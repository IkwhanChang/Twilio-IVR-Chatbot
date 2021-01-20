import {model, Schema, Model, Document} from 'mongoose';
interface IMessage extends Document {
    avatar: string,
    message: string,
    name: string,
    senderName: string,
    timestamps: Date
}

const messageSchema: Schema = new Schema({
    avatar: {
        type: String,
        required: true,
        default: "http://gravatar.com/avatar/15ef5bd18c36ed4a2b8e582022117d97?d=identicon"
    },
    message: {
        type: String,
        required: true,
        default: ""
    },
    name: {
        type: String,
        required: true,
        default: ""
    },
    senderName: {
        type: String,
        required: true,
        default: ""
    },
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  })

const Message: Model<IMessage> = model('Message', messageSchema);

export {IMessage, messageSchema, Message}