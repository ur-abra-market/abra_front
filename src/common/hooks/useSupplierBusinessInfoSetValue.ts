import { useEffect } from 'react';

import { UseFormSetValue } from 'react-hook-form';

import { ISupplierBusinessInfoFormData } from 'common/types';

export const useSupplierBusinessInfoSetValue = (
  setValue: UseFormSetValue<any>,
  data: ISupplierBusinessInfoFormData,
): void => {
  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data, setValue]);
};
