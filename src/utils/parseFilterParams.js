import { CONTACT_TYPE } from '../constants/contacts-const.js';

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return undefined;
  if (CONTACT_TYPE.includes(type)) return type;
  return undefined;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return undefined;
  const normalized = isFavourite.toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
