interface IMessage {
    avatar: string,
    message: string,
    name: string,
    senderName: string,
    timestamps: Date
}

class Message implements IMessage {
    avatar: string;
    message: string;
    name: string;
    senderName: string;
    timestamps: Date;

    constructor({
        avatar = "",
        message = "",
        name = "",
        senderName = "",
        timestamps = new Date()
    }: {
        avatar: string,
        message: string,
        name: string,
        senderName: string,
        timestamps: Date
    }) {
        this.avatar = avatar;
        this.message = message;
        this.name = name;
        this.senderName = senderName;
        this.timestamps = timestamps;
    }
}

export { IMessage, Message }