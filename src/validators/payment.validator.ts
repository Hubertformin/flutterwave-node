import * as yup from 'yup';
import CustomError from "../models/error.model";

let schema = yup.object().shape({
    userId: yup.string().required(),
    email: yup.string().email(),
    phoneNumber: yup.string().required(),
    amount: yup.number().required(),
    country: yup.string().required(),
});


export function validatePaymentBody(body: any) {
    try {
        return schema.validate(body);
    } catch (e) {
        throw CustomError(e.message).status(400)
    }
}
