import Joi from "joi";

export const productPostValidation = Joi.object().keys({
	name: Joi.string().required().max(64),
	price: Joi.string().required().max(256),
	count: Joi.number().required(),
	potentialCount: Joi.number().required(),
	amount: Joi.string().required()
})

export const productPutValidation = Joi.object().keys({
	name: Joi.string().max(64),
	price: Joi.string().max(256),
	count: Joi.number(),
	potentialCount: Joi.number(),
	amount: Joi.string()
})