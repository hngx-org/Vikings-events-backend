const Joi = require('joi')

const isTimeValid = (value, helpers) => {
  const time = new Date(value);
  if (isNaN(time.getTime())) {
    return helpers.error('any.invalid');
  }
  return helpers.error('any.invalid');
};

const createEventValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().min('now').required().iso(),
    end_date: Joi.date().min(Joi.ref('start_date')).required().iso(),
    start_time: Joi.string().custom(isTimeValid, 'Custom Time Validation').required(),
    end_time: Joi.string().custom(isTimeValid, 'Custom Time Validation').required(),
  }),
}

const getEventValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
}

const updateEventValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    location: Joi.string().required(),
    start_date: Joi.date().min('now').iso(),
    end_date: Joi.date().min(Joi.ref('start_date')).iso(),
    start_time: Joi.string().custom(isTimeValid, 'Custom Time Validation'),
    end_time: Joi.string().custom(isTimeValid, 'Custom Time Validation'),
  }).min(1),
}

const deleteEventValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
}

module.exports = { createEventValidation, getEventValidation, updateEventValidation, deleteEventValidation }
