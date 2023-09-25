import * as yup from 'yup';

export const passwordValidationSchema = yup
  .string()
  .required('Field is required')
  .matches(/^[A-Za-z\d!#/+*]+$/, 'Use Latin letters only')
  .matches(/^.{1,30}$/, 'The password length should not exceed 30 characters.')
  .matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!#/+*])[\w!#/+*]{8,}$/,
    'Password must match the next requirements',
  );
