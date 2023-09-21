const Joi = require('joi')

const createCommentValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    body: Joi.string().required(),
  }),
}

const getCommentValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
}

const deleteCommentValidation = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
}

module.exports = { createCommentValidation, getCommentValidation, deleteCommentValidation }
