import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error'
import mongoose from "mongoose";
import { verifyToken } from '../middleware/verify-token';
const { Merchant } = require("../models/merchant")
const { Customer } = require("../models/customer")
const { Promotion } = require("../models/promotion")
const { StoreHour } = require("../models/storeHour")
const { Message } = require("../models/message")
const { Item } = require("../models/item")


const validations = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
]

const customerRouter = express.Router()

// Message CRUD

customerRouter.get('/api/customer/:customerId', async (req: Request, res: Response) => {

    const { customerId } = req.params;
    const customer = await Customer.findById(customerId)

    if (!customer) {
        console.log('Cannot find customer with customerId ' + customerId)
        throw new BadRequestError('Cannot find customer with customerId ' + customerId)
    }

    // Get Messages
    customer.messages = await Promise.all(customer.messages.map(async (id:any) => {
        const msg = await Message.findById(id)
        return msg;
    }))

    res.status(200).send(customer)
})
// Insert
customerRouter.post('/api/customer/:customerId/message', async (req: Request, res: Response) => {

    const { avatar, message, name, senderName } = req.body
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId)

    if (!customer) {
        console.log('Cannot find customer with customerId ' + customerId)
        throw new BadRequestError('Cannot find customer with customerId ' + customerId)
    }

    const newMessage = new Message({
        avatar,
        message,
        name,
        senderName
    });
    newMessage.save();
    customer.messages.push(newMessage);

    customer.save();

    console.log("message is added")
    res.status(200).send(customer)
})

// Delete
customerRouter.delete('/api/customer/:customerId/message/:id', async (req: Request, res: Response) => {

    const { email } = req.body
    const { customerId, messageId } = req.params;
    const customer = await Customer.findById(customerId)

    if (!customer) {
        console.log('Cannot find customer with customerId ' + customerId)
        throw new BadRequestError('Cannot find customer with customerId ' + customerId)
    }

    const message = await Message.findById(messageId);

    customer.messages = customer.messages.filter((msg: any) => !msg.equals(message._id));

    message.deleteOne();
    customer.save();

    console.log("customer message is deleted")
    res.status(200).send(customer)
})


export { customerRouter }