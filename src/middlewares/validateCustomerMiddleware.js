import joi, { string } from 'joi';

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().required()
});

export async function validateCustomer(req, res, next) {
    const customer = req.body;

    const validation = customerSchema.validate(customer, { abortEarly: true });
    
    if (validation.error) {
        res.status(400).send(validation.error.details);
    }

    res.locals.customer = customer;
    next();
}