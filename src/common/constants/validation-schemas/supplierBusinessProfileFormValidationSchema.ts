import * as yup from 'yup';

import { emailValidationSchema } from '../index';

const date = new Date();

const year = date.getFullYear();

export const supplierBusinessProfileFormValidationSchema = yup
  .object({
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
      .test('no-spaces', 'Please enter a valid text', value => {
        return value === undefined || value.trim() !== '';
      }),
    yearEstablished: yup
      .number()
      .min(4, 'Add an existing year')
      .max(year, "this year hasn't come yet")
      .typeError('Should be number')
      .required('Field is required'),
    email: emailValidationSchema,
    textarea: yup
      .string()
      .max(1000)
      .required('Field is required')
      .test('no-spaces', 'Please enter a valid text', value => {
        return value === undefined || value.trim() !== '';
      }),
    address: yup
      .string()
      .min(10)
      .typeError('Should be min 10 symbols')
      .max(300)
      .required('Field is required')
      .test('no-spaces', 'Please enter a valid text', value => {
        return value === undefined || value.trim() !== '';
      }),
    numEmployees: yup.string().required('Field is required'),
    businessSector: yup.string().required('Field is required'),
  })
  .required();
