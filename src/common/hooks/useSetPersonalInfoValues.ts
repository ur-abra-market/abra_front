import { useEffect } from 'react';

import { UseFormSetValue } from 'react-hook-form';

import { ICountry } from 'services/common/common.serviceTypes';
import { ISellerPersonalInfo } from 'store/reducers/seller/profile/slice';
import { ISupplierPersonalInfo } from 'store/reducers/supplier/profile/slice';

export const useSetPersonalInfoValues = (
  setValue: UseFormSetValue<any>,
  data: ISellerPersonalInfo | ISupplierPersonalInfo,
  country?: ICountry,
): void => {
  const { lastName, firstName, countryShort, phoneNumber } = data;

  useEffect(() => {
    if (lastName && firstName && country) {
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phoneNumber', `${country.country_code}${phoneNumber}`);
      setValue('countryId', country.id);
      setValue('countryShort', countryShort);
    }
  }, [lastName, firstName, phoneNumber, setValue, countryShort, country]);
};
