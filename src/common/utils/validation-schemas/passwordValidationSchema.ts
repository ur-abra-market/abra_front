import * as yup from 'yup';

// todo запрещены пробелы и кириллица
export const passwordValidationSchema = yup
  .string()
  .required('Field is required')
  .matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!/#/+/*])[\w!/#/+/*]{8,}$/,
    'Password must match the next requirements',
  );
