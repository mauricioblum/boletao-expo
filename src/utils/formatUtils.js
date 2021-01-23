import { addMinutes, subMinutes } from 'date-fns';

export const parseCNPJ = cnpj => {
  if (!cnpj) {
    return '';
  }
  if (cnpj.length !== 14) {
    return cnpj;
  }

  return `${cnpj.substring(0, 3)}.${cnpj.substring(3, 6)}.${cnpj.substring(
    6,
    9
  )}/${cnpj.substring(9, 13)}-${cnpj.slice(-2)}`;
};

export const parseValue = value => {
  if (!value) {
    return 0;
  }

  return value / 100;
};

export const parseDate = date => {
  // eslint-disable-next-line no-restricted-globals
  if (!date || isNaN(new Date(date).getTime())) {
    return new Date();
  }

  const dateToParse = date.split('-');
  const parsedDate = new Date(
    dateToParse[0],
    dateToParse[1] - 1,
    dateToParse[2],
    15,
    0
  );
  return parsedDate;
};

export const parseStringToDate = date => {
  const parsed = date.split('-');

  if (parsed) {
    return `${String(parsed[2]).padStart(2, '0')}/${String(
      parsed[1].padStart(2, '0')
    )}/${parsed[0]}`;
  }
  return '';
};

export function formatTimezone(date) {
  const offset = date.getTimezoneOffset();

  return Math.sign(offset) !== -1
    ? addMinutes(date, offset)
    : subMinutes(date, Math.abs(offset));
}
