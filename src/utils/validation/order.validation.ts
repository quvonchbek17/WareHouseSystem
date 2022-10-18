import Joi from "joi";

export const OrderPostValidation = Joi.object().keys({
	description: Joi.string().required()
})

export const OrderPutValidation = Joi.object().keys({
	description: Joi.string().required(),
	status: Joi.string().valid('accepted', 'arrived').required(),
	userId: Joi.string().uuid({
		version: 'uuidv4'
	}).required()
})

export const OrderProductsPostValidation = Joi.object().keys({
	orderProducts: Joi.
	array().items(
		Joi.object({
			product_count: Joi.number().max(100).required(),
			product: Joi.string().required().uuid({
				version: 'uuidv4'
			}),
			order: Joi.string().required().uuid({
				version: 'uuidv4'
			})
		})
	)
})

export const OrderProductsPutValidation = Joi.object().keys({
	count: Joi.number().required()
})
