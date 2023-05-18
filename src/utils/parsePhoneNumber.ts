interface IParsePhoneNumberReturnValue {
  countryCode: string;
  phoneNumberBody: string;
  phoneNumberFull: string;
}

export const parsePhoneNumber = (phone: string): IParsePhoneNumberReturnValue => {
  const countryCodeRegex = /^(\+\d+)\s/;
  const countryCode = phone.match(countryCodeRegex)?.[1] ?? '';
  const phoneNumberBody = /\s/.test(phone)
    ? phone.replace(countryCodeRegex, '').replace(/\D+/g, '')
    : phone;

  return {
    countryCode,
    phoneNumberBody,
    phoneNumberFull: `${countryCode}${phoneNumberBody}`,
  };
};
