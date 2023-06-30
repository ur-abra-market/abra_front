import { useEffect } from 'react';

import { UseFormSetValue } from 'react-hook-form';

import { ISupplierBusinessInfoFormData } from 'common/types';

export const useSupplierBusinessInfoSetValue = (
  setValue: UseFormSetValue<any>,
  data: ISupplierBusinessInfoFormData,
): void => {
  const { countryCode, countryRegistration, countryShort } = data;

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'phoneNumber') {
          setValue(key, `${countryCode}${value}`);
        } else {
          setValue(key, value);
        }
      });
    }
  }, [data, setValue, countryRegistration, countryShort, countryCode]);
};
