import { ContactsCollection } from '../db/models/contact.js';
import { Types } from 'mongoose';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

// ..........................................................

export const getContactById = async (contactId) => {
  console.log('Checking contactId:', contactId);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId');
    return null;
  }
  try {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};

// ..........................................................

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// ..........................................................

export const updateContact = async (contactId, payload, options = {}) => {
  console.log('Updating contactId:', contactId);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId for update');
    return null;
  }
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};

export const deleteContact = async (contactId) => {
  console.log('Deleting contactId:', contactId);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId for delete');
    return null;
  }
  try {
    const contact = await ContactsCollection.findOneAndDelete({
      _id: contactId,
    });
    return contact;
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};
