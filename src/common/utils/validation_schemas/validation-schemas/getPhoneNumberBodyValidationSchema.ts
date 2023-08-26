import * as yup from 'yup';

import { CountriesEnum } from 'common/types';
import { countryPhoneInfo } from 'elements/PhoneNumber/utils';

export const getPhoneNumberBodyValidationSchema = (
  isFieldOptional: boolean = false,
): yup.StringSchema => {
  return yup
    .string()
    .test('phone_validation', 'Please, enter a valid phone number', function (value) {
      // if the phone is optional, then there will be no error for an empty field
      if (isFieldOptional && !value) return true;

      // extract the phone number's country ID from the form context
      const phoneNumberCountryId = this.parent
        .businessPhoneNumberCountryId as CountriesEnum;

      // get the phone number body validation schema for the required country
      const info = countryPhoneInfo[phoneNumberCountryId];

      // check the phone number body value using a regular expression
      return info.startRegex.test(value || '');
    });
};
