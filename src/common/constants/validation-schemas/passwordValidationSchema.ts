import * as yup from 'yup';

export const passwordValidationSchema = yup
  .string()
  .matches(/^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/);
