import * as yup from 'yup';

export const addressFormValidationSchema = yup
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
    phoneNumber: yup.string().required('Field is required'),
    area: yup
      .string()
      .min(2, 'Please enter at least 2 characters')
      .max(100, 'Please limit to 100 characters'),
    city: yup
      .string()
      .min(2, 'Please enter at least 2 characters')
      .max(100, 'Please limit to 100 characters'),
    building: yup
      .string()
      .min(1, 'Please enter at least 1 character')
      .max(10, 'Please limit to 10 characters'),
    street: yup
      .string()
      .min(2, 'Please enter at least 1 characters')
      .max(100, 'Please limit to 100 characters'),
    apartment: yup
      .string()
      .min(1, 'Please enter at least 1 character')
      .max(10, 'Please limit to 10 characters'),
    postalCode: yup
      .string()
      .min(1, 'Please enter at least 1 character')
      .max(10, 'Please limit to 10 characters')
      .required('Field is required'),
    country: yup
      .string()
      .oneOf([
        'Azerbaijan',
        'Belarus',
        'Kazakhstan',
        'Kyrgyzstan',
        'Russian Federation',
        'Tajikistan',
        'Turkey',
        'Ukraine',
        'Uzbekistan',
      ])
      .required('Pick country'),
    isMain: yup.boolean(),
  })
  .required();
