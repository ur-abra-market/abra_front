interface IParsePhoneNumberReturnValue {
  countryCode: string;
  numberBody: string;
  numberFull: string;
}

export const parsePhoneNumber = (phone: string): IParsePhoneNumberReturnValue => {
  const countryCodeRegex = /^(\+\d+)\s/;
  const countryCode = phone.match(countryCodeRegex)?.[1] ?? '';
  const numberBody = /\s/.test(phone)
    ? phone.replace(countryCodeRegex, '').replace(/\D+/g, '')
    : phone;

  return {
    countryCode,
    numberBody,
    numberFull: `${countryCode}${numberBody}`,
  };
};
