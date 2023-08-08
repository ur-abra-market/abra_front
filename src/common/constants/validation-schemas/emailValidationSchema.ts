import * as yup from 'yup';

const emailRegex =
  /^(([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*)|(".+"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidationSchema = yup
  .string()
  .matches(emailRegex, 'Invalid email')
  .required('Email is required');
