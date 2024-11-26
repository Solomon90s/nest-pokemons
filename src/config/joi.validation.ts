import * as Joi from 'joi';

//* Nos creamos un validation schema que tenga las propiedades que estoy esperando
export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(5),
})