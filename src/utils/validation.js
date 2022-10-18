import { Joi } from 'joi'

export const UserPostFilter = Joi.object().keys({
    name: Joi.string().required().min(12),
    
})