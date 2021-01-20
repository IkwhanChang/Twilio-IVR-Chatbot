import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error'
import mongoose from "mongoose";
import { verifyToken } from '../middleware/verify-token';
import { ICustomer } from '../models/customer';
import { IMerchant } from '../models/merchant';
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

const merchantRouter = express.Router()

merchantRouter.get('/api/merchant', verifyToken, async (req: Request, res: Response) => {

    const { email } = req.body

    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    

    // Get StoreHour
    merchant.storeHours = await Promise.all(merchant.storeHours.map(async (id:any) => {
        const hour = await StoreHour.findById(id)
        return hour;
    }))

    // Get Items
    merchant.items = await Promise.all(merchant.items.map(async (id:any) => {
        const _item = await Item.findById(id)
        return _item;
    }))

    // Get Promotions
    merchant.promotions = await Promise.all(merchant.promotions.map(async (id:any) => {
        const promo = await Promotion.findById(id)
        return promo;
    }))

    // Get Customers
    merchant.customers = await Promise.all(merchant.customers.map(async (id:any) => {
        const _customer = await Customer.findById(id)
        // Get Messages
        _customer.messages = await Promise.all(_customer.messages.map(async (id:any) => {
            const msg = await Message.findById(id)
            return msg;
        }))
        return _customer;
    }))    

    res.status(200).send(merchant)
})

merchantRouter.get('/api/merchants', verifyToken, async (req: Request, res: Response) => {

    const { email } = req.body

    const _merchants = await Merchant.find()

    const merchants = await Promise.all(
        _merchants.map(async (merchant: IMerchant) => {
            // Get StoreHour
            merchant.storeHours = await Promise.all(merchant.storeHours.map(async (id:any) => {
                const hour = await StoreHour.findById(id)
                return hour;
            }))
    
            // Get Items
            merchant.items = await Promise.all(merchant.items.map(async (id:any) => {
                const _item = await Item.findById(id)
                return _item;
            }))
    
            // Get Promotions
            merchant.promotions = await Promise.all(merchant.promotions.map(async (id:any) => {
                const promo = await Promotion.findById(id)
                return promo;
            }))
    
            // Get Customers
            merchant.customers = await Promise.all(merchant.customers.map(async (id:any) => {
                const _customer = await Customer.findById(id)
                // Get Messages
                _customer.messages = await Promise.all(_customer.messages.map(async (id:any) => {
                    const msg = await Message.findById(id)
                    return msg;
                }))
                return _customer;
            }))    
            return merchant;
        })
    )

    res.status(200).send(merchants)

    
})

// Item CRUD

// Insert
merchantRouter.post('/api/merchant/item', verifyToken, async (req: Request, res: Response) => {

    const { email, name, stock } = req.body
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const newItem = new Item({
        name,
        stock
    });
    newItem.save();
    merchant.items.push(newItem);

    merchant.save()

    console.log("merchant item is added")
    res.status(200).send(merchant)
})

// Delete
merchantRouter.delete('/api/merchant/item/:id', verifyToken, async (req: Request, res: Response) => {

    const { email } = req.body
    const { id } = req.query;
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const item = await Item.findOne({ id });

    merchant.items = merchant.items.filter((c: any) => !c.equals(item._id));
    item.deleteOne();
    merchant.save();

    console.log("merchant item is deleted")
    res.status(200).send(merchant)
})

// Update
merchantRouter.put('/api/merchant/item/:id', verifyToken, async (req: Request, res: Response) => {

    const { email, name, stock } = req.body
    const { id } = req.query;

    // const merchant = await Merchant.findOne({email})

    // if (!merchant) {
    // 	console.log('Cannot find merchant with email ' + email)
    // 	throw new BadRequestError('Cannot find merchant with email ' + email)
    // }

    const item = await Item.findOne({ id });
    item.name = name || item.name;
    item.stock = stock || item.stock;

    item.save();

    console.log("merchant item is added")
    res.status(200).send(item)
})

// Promotion CRUD


// Insert
merchantRouter.post('/api/merchant/promotion', verifyToken, async (req: Request, res: Response) => {

    const { email, startDate, endDate, itemId, discount } = req.body
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const newPromotion = new Promotion({
        startDate, endDate, itemId, discount
    });
    newPromotion.save();
    merchant.promotions.push(newPromotion);

    merchant.save()

    console.log("merchant promotion is added")
    res.status(200).send(merchant)
})

// Delete
merchantRouter.delete('/api/merchant/promotion/:id', verifyToken, async (req: Request, res: Response) => {

    const { email } = req.body
    const { id } = req.query;
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const promotion = await Promotion.findOne({ id });

    merchant.promotions = merchant.promotions.filter((c: any) => !c.equals(promotion._id));
    promotion.deleteOne();
    merchant.save();

    console.log("merchant promotion is deleted")
    res.status(200).send(merchant)
})

// Update
merchantRouter.put('/api/merchant/promotion/:id', verifyToken, async (req: Request, res: Response) => {

    const { email, startDate, endDate, discount } = req.body
    const { id } = req.query;

    // const merchant = await Merchant.findOne({email})

    // if (!merchant) {
    // 	console.log('Cannot find merchant with email ' + email)
    // 	throw new BadRequestError('Cannot find merchant with email ' + email)
    // }

    const promotion = await Promotion.findOne({ id });
    promotion.startDate = startDate || promotion.startDate;
    promotion.endDate = endDate || promotion.endDate;
    promotion.discount = discount || promotion.discount;

    promotion.save();

    console.log("merchant promotion is added")
    res.status(200).send(promotion)
})

// Customer CRUD

// Insert
merchantRouter.post('/api/merchant/customer', verifyToken, async (req: Request, res: Response) => {

    const { email, name, phoneNumber } = req.body
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const newCustomer: ICustomer = new Customer({
        name,
        phoneNumber
    });
    newCustomer.save();
    merchant.customers.push(newCustomer);

    merchant.save()

    console.log("merchant customer is added")
    res.status(200).send(merchant)
})

// Delete
merchantRouter.delete('/api/merchant/customer/:id', verifyToken, async (req: Request, res: Response) => {

    const { email } = req.body
    const { id } = req.query;
    const merchant = await Merchant.findOne({ email })

    if (!merchant) {
        console.log('Cannot find merchant with email ' + email)
        throw new BadRequestError('Cannot find merchant with email ' + email)
    }

    const customer = await Customer.findOne({ id });

    merchant.customers = merchant.customers.filter((c: any) => !c.equals(customer._id));
    customer.deleteOne();
    merchant.save();

    console.log("merchant customer is deleted")
    res.status(200).send(merchant)
})

// Update
merchantRouter.put('/api/merchant/customer/:id', verifyToken, async (req: Request, res: Response) => {

    const { email, name, phoneNumber } = req.body
    const { id } = req.query;

    // const merchant = await Merchant.findOne({email})

    // if (!merchant) {
    // 	console.log('Cannot find merchant with email ' + email)
    // 	throw new BadRequestError('Cannot find merchant with email ' + email)
    // }

    const customer = await Customer.findOne({ id });
    customer.name = name || customer.name;
    customer.phoneNumber = phoneNumber || customer.phoneNumber;

    customer.save();

    console.log("merchant customer is added")
    res.status(200).send(customer)
})

export { merchantRouter }