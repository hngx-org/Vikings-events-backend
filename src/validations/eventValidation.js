const Joi = require('joi')

const isTimeValid = (value, helpers) => {
  const timeParts = value.split(':'); // Time format will be "HH:mm"
  
  if (timeParts.length !== 2) {
    return helpers.error('any.invalid');
  }

  const [hours, minutes] = timeParts;
  
  const parsedHours = parseInt(hours, 10);
  const parsedMinutes = parseInt(minutes, 10);

  if (isNaN(parsedHours) || parsedHours < 0 || parsedHours > 23 || isNaN(parsedMinutes) || parsedMinutes < 0 || parsedMinutes > 59) {
    return helpers.error('any.invalid');
  }

  const time = new Date();
  time.setHours(parsedHours, parsedMinutes, 0);

  if (isNaN(time.getTime())) {
    return helpers.error('any.invalid');
  }

  return value; 
};

const currentDateOnly = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const createEventValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().min(currentDateOnly()).required().iso(),
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
