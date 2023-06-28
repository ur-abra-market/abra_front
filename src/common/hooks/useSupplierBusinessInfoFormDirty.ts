import { useEffect, useState } from 'react';

import { ISupplierBusinessInfoFormData } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';

export const useSupplierBusinessInfoFormDirty = (
  data: ISupplierBusinessInfoFormData,
  watch: any,
): { isDirty: boolean; isPhoneNumberDisable: boolean } => {
  const [isDirty, setIsDirty] = useState(true);
  const formValues: ISupplierBusinessInfoFormData = watch();

  useEffect(() => {
    const isFormModified = Object.keys(formValues).some(key => {
      if (key !== 'businessSector' && key !== 'phoneNumber') {
        return (
          String(formValues[key as keyof ISupplierBusinessInfoFormData]) !==
          String(data[key as keyof ISupplierBusinessInfoFormData])
        );
      }
      if (key === 'businessSector') {
        return data.businessSector?.value !== formValues.businessSector?.value;
      }

      return false;
    });

    setIsDirty(isFormModified);
  }, [formValues, data]);

  const serverPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
  const { numberFull: currentPhoneNumber } = parsePhoneNumber(
    formValues.phoneNumber || '',
  );

  const isPhoneNumberDisable = currentPhoneNumber === serverPhoneNumber;

  return { isDirty, isPhoneNumberDisable };
};
