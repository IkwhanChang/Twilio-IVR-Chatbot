import {ValidationError} from 'express-validator'
import CustomError from './custom-error'

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor (public errors: ValidationError[]) {
        super('Invalide request parameters')

        // Only for extending build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError() {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        })
    }
}

