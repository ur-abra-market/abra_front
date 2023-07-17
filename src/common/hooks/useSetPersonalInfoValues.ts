import { useEffect } from 'react';

import { UseFormSetValue } from 'react-hook-form';

import { IUserPersonalInfo } from 'store/reducers/userSlice';

export const useSetPersonalInfoValues = (
  setValue: UseFormSetValue<any>,
  data: IUserPersonalInfo,
): void => {
  const { lastName, firstName, phoneNumberCountryId, phoneNumberBody } = data;

  useEffect(() => {
    if (lastName && firstName && phoneNumberCountryId && phoneNumberBody) {
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phoneNumberCountryId', phoneNumberCountryId);
      setValue('phoneNumberBody', phoneNumberBody);
    }
  }, [lastName, firstName, phoneNumberBody, phoneNumberCountryId, phoneNumberBody]);
};
