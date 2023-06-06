import * as yup from 'yup';

import { emailValidationSchema } from '../../../../../common/constants';

const date = new Date();

const year = date.getFullYear();

export const supplierBusinessInfoFormValidationSchema = yup.object({
  storeName: yup
    .string()
    .min(2)
    .max(100)
    .typeError('Should be min 2 symbols')
    .required('Field is required')
    .test('no-spaces', 'Please enter a valid text', value => {
      return value === undefined || value.trim() !== '';
    }),
  entrepreneurNumber: yup
    .string()
    .min(2)
    .max(50)
    .typeError('Should be min 2 symbols')
    .required('Field is required')
    .test('no-spaces', 'Please enter a valid license or entrepreneur number', value => {
      return value === undefined || value.trim() !== '';
    }),
  yearEstablished: yup
    .number()
    .min(4, 'Add an existing year')
    .max(year, "this year hasn't come yet")
    .required('Please enter the year your company was founded'),
  email: emailValidationSchema,
  aboutBusiness: yup.string().max(1000, 'Description should be max 1000 symbols'),
  address: yup
    .string()
    .test('check-address', 'Should be min 10 symbols and max 300 symbols', value =>
      !value || value.trim() === '' ? true : !(value.length < 10 || value.length > 300),
    )
    .test('not-only-numbers', 'Address cannot contain only numeric values', value =>
      !value || value.trim() === '' ? true : /\D/.test(value),
    ),
  numEmployees: yup.string().required('Field is required'),
  businessSector: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Please select your business sector'),
});
