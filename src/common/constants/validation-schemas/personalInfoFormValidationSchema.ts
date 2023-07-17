import * as yup from 'yup';

export const personalInfoFormValidationSchema = yup
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
    phoneNumberBody: yup.string().required('Field is required'),
  })
  .required();
