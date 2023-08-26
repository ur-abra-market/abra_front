import { useEffect, useState } from 'react';

import { ITestSupplierBusinessInfo } from 'store/reducers/supplier/profile/types';

export const useSupplierBusinessInfoFormDirty = (
  data: ITestSupplierBusinessInfo,
  watch: () => ITestSupplierBusinessInfo,
): boolean => {
  const [isDirty, setIsDirty] = useState(true);
  const formValues: ITestSupplierBusinessInfo = watch();

  useEffect(() => {
    const isFormModified = Object.keys(formValues).some(key => {
      return (
        String(formValues[key as keyof ITestSupplierBusinessInfo]) !==
        String(data[key as keyof ITestSupplierBusinessInfo])
      );
    });

    setIsDirty(isFormModified);
  }, [formValues, data]);

  return isDirty;
};
