import * as yup from 'yup';

export const emailValidationSchema = yup
  .string()
  .matches(/@/, 'You forgot about “@”')
  .email('Invalid email')
  .required('Email is required');
