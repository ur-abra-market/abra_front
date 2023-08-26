import * as yup from 'yup';

import { CountriesEnum } from 'common/types';
import { getPhoneNumberBodyValidationSchema } from 'common/utils';
import { countryPhoneInfo } from 'elements/PhoneNumber/utils';

const date = new Date();

const year = date.getFullYear();
const ACCEPTABLE_YEAR = 1960;

export const supplierBusinessInfoFormValidationSchema = yup.object({
  storeName: yup
    .string()
    .required('Please enter your company name')
    .min(2, 'Should be min 2 symbols')
    .max(100)
    .test('no-spaces', 'Please enter a valid text', value => {
      return value === undefined || value.trim() !== '';
    }),
  businessSector: yup.string().required('Please select your business sector'),
  is_manufacturer: yup.boolean(),
  license: yup
    .string()
    .required('Please enter a valid license or entrepreneur number')
    .min(2, 'Should be min 2 symbols')
    .max(50)
    .test('no-spaces', 'Please enter a valid license or entrepreneur number', value => {
      return value === undefined || value.trim() !== '';
    }),
  yearEstablished: yup
    .string()
    .required('Please enter the year your company was founded')
    .matches(/^\d+$/, 'Year must contain only numbers')
    .test('is-four-digits', 'Year must have four digits', value => {
      if (value && /^\d+$/.test(value)) {
        return value.length === 4;
      }
    })
    .test('is-not-correct-year', 'Please enter a valid year', value => {
      if (value && /^\d+$/.test(value)) {
        return parseInt(value, 10) >= ACCEPTABLE_YEAR;
      }
    })
    .test('is-future-year', "This year hasn't come yet", value => {
      if (value && /^\d+$/.test(value)) {
        return parseInt(value, 10) <= year;
      }
    }),
  numberEmployees: yup.number().required('Field is required'),
  countryRegistration: yup
    .number()
    .required('Please select country of company registration'),
  description: yup.string().max(1000, 'Description should be max 1000 symbols'),
  businessPhoneNumberCountryId: yup.number(),
  businessPhoneNumberBody: getPhoneNumberBodyValidationSchema(true),
  businessEmail: yup.string().email('Invalid email'),
  companyAddress: yup
    .string()
    .test('check-address', 'Should be min 10 symbols and max 300 symbols', value =>
      !value || value.trim() === '' ? true : !(value.length < 10 || value.length > 300),
    )
    .test('not-only-numbers', 'Address cannot contain only numeric values', value =>
      !value || value.trim() === '' ? true : /\D/.test(value),
    ),
});
