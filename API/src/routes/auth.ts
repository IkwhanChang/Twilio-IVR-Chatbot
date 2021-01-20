import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { Strategy as BearerStrategy } from "passport-http-bearer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Merchant, buildMerchant } = require("../models/merchant")


const key = process.env.SECRET || "IVR-SECRET";

const router = express.Router();

const registerValidations = [
	body('email')
		.isEmail()
		.withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Password must be between 4 and 20 characters')
]

const loginValidations = [
	body('email')
		.isEmail()
		.withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Password must be between 4 and 20 characters')
]



router.post("/signup", registerValidations, async (req: Request, res: Response) => {
	
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array())
	}

	const {
		email,
		password,
		name,
		storeName,
		menuLink,
		address1,
		address2,
		city,
		state,
		zipcode,
		phoneNumber,
		twilioPhoneNumber
	} = req.body;

	const existingMerchant = await Merchant.findOne({ email })

	if (existingMerchant) {
		console.log("Email is in use")
		throw new BadRequestError('Email in use')
	}

	const newMerchant = new Merchant({
		username: email,
		email,
		password,
		name,
		storeName,
		menuLink,
		address1,
		address2,
		city,
		state,
		zipcode,
		phoneNumber,
		twilioPhoneNumber,
		messages: [],
		customers: [],
		storeHours: [],
		promotions: [],
		items: []
	});

	var salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	newMerchant.password = hash;
	newMerchant
		.save()
		.then((merchant: object) => {
			console.log("merchant is created")
			res.json(merchant)
		})
		.catch((err: Error) => {
			console.log(err)
			res.status(500)
		});


	// const { email, password, name } = req.body
	// const promotions: any[] = [], storeHours: any[] = []
	// const existingMerchant = await Merchant.findOne({ email })

	// if (existingMerchant) {
	// 	console.log("Email is in use")
	// 	throw new BadRequestError('Email in use')
	// }

	// const merchant = buildMerchant({ email, password, name, promotions, storeHours })
	// await merchant.save()

	// console.log("merchant is created")
	// res.status(201).send(merchant)
})

// @route   GET api/users/login
// @desc    Login User / Returing JWT Token
// @access  Public
router.post("/login", loginValidations, async (req: Request, res: Response) => {
	
	// Check Validation
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array())
	}

	const { email, password } = req.body;

	// Find user by email
	const existingMerchant = await Merchant.findOne({ email })
	if (!existingMerchant) {
		console.log("Merchant not found")
		throw new BadRequestError('Merchant not found')
	}
	const comparePassword = bcrypt.compareSync(password, existingMerchant.password);
	
	if (comparePassword) {
		// User Matched
		const {
			id,
			username,
			email,
			storeName,
			menuLink,
			address1,
			address2,
			city,
			state,
			zipcode,
			phoneNumber,
			twilioPhoneNumber,
			customer,
			storeHours,
			promotions,
			items
		} = existingMerchant;

		const payload = {
			id,
			username,
			email,
		};
		// Sign Token
		jwt.sign(
			payload,
			key,
			{
				expiresIn: 604800 // 1 Week
			},
			(err, token) => {
				res.json({
					success: true,
					token: "Bearer " + token
				});
			}
		);
	} else {
		console.log("Invalid Password")
		throw new BadRequestError('Invalid Password')
	}
});


export { router as authRouter }
