import * as yup from 'yup';

export const passwordValidationSchema = yup
  .string()
  .required()
  .matches(
    /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Your password must comply with the security rules below',
  );
