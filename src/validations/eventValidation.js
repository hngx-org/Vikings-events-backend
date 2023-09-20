import Joi from 'joi'

const createEventValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
  }),
}

const getEventValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
}

export { createEventValidation, getEventValidation }
