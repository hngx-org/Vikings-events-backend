const Joi = require('joi')

const createGroupValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
}

const getGroupValidation = {
  params: Joi.object().keys({
    groupId: Joi.number().required(),
  }),
}

const updateGroupValidation = {
  params: Joi.object().keys({
    groupId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
}

const deleteGroupValidation = {
  params: Joi.object().keys({
    groupId: Joi.number().required(),
  }),
}

const addMemberToGroupValidation = {
  params: Joi.object().keys({
    groupId: Joi.number().required(),
    userId: Joi.number().required(),
  }),
}

const deleteMemberFromGroupValidation = {
  params: Joi.object().keys({
    groupId: Joi.number().required(),
    userId: Joi.number().required(),
  }),
}

module.exports = { createGroupValidation, getGroupValidation, updateGroupValidation, deleteGroupValidation, addMemberToGroupValidation, deleteMemberFromGroupValidation }
