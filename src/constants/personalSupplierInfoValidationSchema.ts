import * as yup from 'yup';

export const personalSupplierInfoValidationSchema = yup
  .object({
    firstName: yup
      .string()
      .required('Field is required')
      .min(2, 'Please enter at least 2 characters')
      .max(50, 'Please limit to 50 characters')
      .test('no-spaces', 'Please enter a valid name', value => {
        return value === undefined || value.trim() !== '';
      }),
    lastName: yup
      .string()
      .required('Field is required')
      .min(2, 'Please enter at least 2 characters')
      .max(50, 'Please limit to 50 characters')
      .test('no-spaces', 'Please enter a valid name', value => {
        return value === undefined || value.trim() !== '';
      }),
    code: yup.string().required('Field is required'),
    tel: yup
      .string()
      .required('Field is required')
      .matches(/^[0-9]*$/, 'Please enter only digits')
      .min(5, 'Please enter at least 5 digits')
      .max(14, 'Please limit to 14 digits')
      .typeError('Please enter only digits'),
  })
  .required();
