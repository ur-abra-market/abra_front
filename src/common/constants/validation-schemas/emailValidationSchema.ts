import * as yup from 'yup';

export const emailValidationSchema = yup
  .string()
  .email('Invalid email')
  .required('Email is required');
