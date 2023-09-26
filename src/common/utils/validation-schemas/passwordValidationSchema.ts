import * as yup from 'yup';

export const MAX_COUNT_PASSWORD = 30;

export const passwordValidationSchema = yup
  .string()
  .required('Field is required')
  .matches(/^[A-Za-z\d!#/+*]+$/, 'Use Latin letters only')
  .matches(/^.{1,30}$/, `Password must be at most ${MAX_COUNT_PASSWORD} characters`)
  .matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!#/+*])[\w!#/+*]{8,}$/,
    'Password must match the next requirements',
  );
