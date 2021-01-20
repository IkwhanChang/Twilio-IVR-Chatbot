import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
const { Merchant } = require("../models/merchant")

const key = process.env.SECRET || "IVR-SECRET";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "080a0677-6ca1-4575-bd08-69e53ae39991";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader === ADMIN_TOKEN){
        next();
    } else if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        try {
            var decoded = jwt.verify(bearerToken, key) as {
                email: string
            }
            const {email} = decoded;

            const existingMerchant = await Merchant.findOne({ email })
            req.body.email = existingMerchant.email;
            if (!existingMerchant) {
                console.log("Merchant not found")
                res.sendStatus(403);
            }
            next();
        } catch (err) {
            // err
            res.sendStatus(403);
        }



        
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}