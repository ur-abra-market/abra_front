import * as yup from 'yup';

export const passwordValidationSchema = yup
  .string()
  .required('Field is required')
  .matches(
    /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Password must match the next requirements',
  );
