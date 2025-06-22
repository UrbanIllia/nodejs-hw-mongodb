import Joi from 'joi';

import { CONTACT_TYPE } from '../constants/contacts-const.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must not exceed 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must not exceed 20 characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .required()
    .messages({
      'any.required': 'Contact type is required',
      'any.only': `Короче шось з цього вибирай ${CONTACT_TYPE.join(
        ', ',
      )}! А не то шо хочеш...`,
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must not exceed 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must not exceed 20 characters',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .messages({
      'any.only': `Короче шось з цього вибирай ${CONTACT_TYPE.join(
        ', ',
      )}! А не то шо хочеш...`,
    }),
});
