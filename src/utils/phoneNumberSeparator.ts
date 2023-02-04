export const countryPrefix = num => {
  let prefix = '';

  if (num.includes('+7')) prefix = '+7';
  if (num.includes('+90')) prefix = '+90';

  return prefix;
};

export const numberWithoutPrefix = num => {
  let body = '';

  if (num.includes('+7')) body = num.slice(2);
  if (num.includes('+90')) body = num.slice(3);

  return body;
};
