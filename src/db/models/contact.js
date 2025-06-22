import { model, Schema } from 'mongoose';

import { saveErrorHandler, setUpdateSettings } from './hooks.js';

import { CONTACT_TYPE } from '../../constants/contacts-const.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', saveErrorHandler);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', saveErrorHandler);

export const ContactsCollection = model('contact', contactSchema);
