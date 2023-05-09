export const parsePhoneNumber = (
  phone: string,
): { countryCode: string; phoneNumber: string } => {
  const countryCodeRegex = /^(\+\d+)\s/;
  const countryCode = phone.match(countryCodeRegex)?.[1] ?? '';
  const phoneNumber = phone.replace(countryCodeRegex, '').replace(/\D+/g, '');

  return {
    countryCode,
    phoneNumber,
  };
};
