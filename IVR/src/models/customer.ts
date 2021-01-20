import { IMessage, Message } from './message';
interface ICustomer {
    name: string,
    phoneNumber: string,
    messages: Array<IMessage>
}


class Customer implements ICustomer {
    name: string;
    phoneNumber: string;
    messages: Array<IMessage>;

    constructor({
        name = "",
        phoneNumber = "",
        messages
    }: {
            name: string,
            phoneNumber: string,
            messages: Array<IMessage>
        }) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.messages = new Array<IMessage>()
        messages.forEach(message => {
            this.messages.push(new Message(message))
        })

    }
}

export { ICustomer, Customer }