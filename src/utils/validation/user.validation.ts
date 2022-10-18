import Joi from "joi";

enum FilterRole {
	storekeepers,
	not_actives,
	drivers,
	active
}

export const UserPostSchema = Joi.object().keys({
	name: Joi.string().required().max(64),
	password: Joi.string().required().max(32),
	status: Joi.number().valid(1, 2).required()
})

export const UserRoleFilter = Joi.object().keys({
	filteredStatus: Joi.string().valid(...Object.values(FilterRole).filter(e => typeof e == 'string')).required()
})

export const UserPutFilter = Joi.object().keys({
	name: Joi.string().max(64),
	password: Joi.string().max(32),
	status: Joi.number().valid(1, 2),
	is_active: Joi.boolean()
})

export const UserInfoPostFilter = Joi.object().keys({
	userId: Joi.string().uuid({
		version: "uuidv4"
	}).required(),
	fullname: Joi.string().required().max(64),
	phone: Joi.string().regex(new RegExp(/9989/)).required().max(12)
})

export const ParamFilter = Joi.object().keys({
	id: Joi.string().uuid({
		version: 'uuidv4'
	}).required()
})

export const UserInfoPutFilter = Joi.object().keys({
	phone: Joi.string().regex(new RegExp(/9989/)).required().max(12),
	fullname: Joi.string().required().max(64)
})