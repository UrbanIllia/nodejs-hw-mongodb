import { ContactsCollection } from '../db/models/contact.js';
import { Types } from 'mongoose';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  type,
  isFavourite,
  req,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  try {
    const filter = { userId: req.user._id };
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite;

    const totalItems = await ContactsCollection.countDocuments(filter);
    const contacts = await ContactsCollection.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(totalItems, limit, page);

    return {
      data: contacts,
      ...paginationData,
    };
  } catch (error) {
    throw new Error(`Короче шось не виходить зробити фетч: ${error.message}`);
  }
};

// ..........................................................

export const getContactById = async (contactId, req) => {
  console.log('Checking contactId:', contactId);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId');
    return null;
  }
  try {
    const contact = await ContactsCollection.findOne({
      _id: contactId,
      userId: req.user._id,
    });
    return contact;
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};

// ..........................................................

export const createContact = async (payload, req) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId: req.user._id,
  });
  return contact;
};

// ..........................................................

export const updateContact = async (contactId, payload, options = {}, req) => {
  console.log('Updating contactId:', contactId, 'User ID:', req.user._id);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId for update');
    return null;
  }
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId: req.user._id },
      payload,
      {
        includeResultMetadata: true,
        ...options,
      },
    );
    console.log('Raw result:', rawResult);
    if (!rawResult || !rawResult.value) {
      console.log('Contact not found or not updated');
      return null;
    }
    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};

// .........................................................

export const deleteContact = async (contactId, req) => {
  console.log('Deleting contactId:', contactId);
  if (!contactId || !Types.ObjectId.isValid(contactId)) {
    console.log('Invalid ObjectId for delete');
    return null;
  }
  try {
    const contact = await ContactsCollection.findOneAndDelete({
      _id: contactId,
      userId: req.user._id,
    });
    return contact;
  } catch (error) {
    console.log('MongoDB error:', error.message);
    return null;
  }
};
