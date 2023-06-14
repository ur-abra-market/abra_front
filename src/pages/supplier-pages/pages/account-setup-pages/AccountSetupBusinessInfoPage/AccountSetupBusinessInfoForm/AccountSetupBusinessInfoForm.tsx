import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../../../common/hooks';
import { getCountries } from '../../../../../../store/reducers/commonSlice';
import { SupplierRegisterFormStep } from '../../../../../../ui-kit';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../../supplier-pages-common';

import style from './AccountSetupBusinessInfoForm.module.scss';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<ISupplierBusinessInfoFormValues>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      aboutBusiness: '',
      tel: '',
      yearEstablished: null,
      address: '',
      checkbox: false,
      numEmployees: '',
      storeName: '',
      businessSector: null,
      entrepreneurNumber: '',
    },
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onSubmit = (data: any): void => {
    console.log(data);
    // const phone = data.code + data.tel;
    // const info = {
    //   name: data.storeName,
    //   business_sector: data.businessSector,
    //   year_established: +data.yearEstablished,
    //   number_of_employees: +data.numEmployees,
    //   description: data.textarea,
    //   phone,
    //   business_email: data.email,
    //   address: data.address,
    //   is_manufacturer: data.checkbox ? 1 : 0,
    // };
    // const accountInfoForRequest = filterEmptyValues(info);
    // dispatch(
    //   updateSupplierAccountDataService({
    //     ...accountInfo,
    //     license: {
    //       // @ts-ignore
    //       license_number: accountInfo?.user_info.license,
    //     },
    //     company_info: {
    //       ...accountInfoForRequest,
    //     },
    //   }),
    // );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.form_container}>
        <div className={style.step}>
          <SupplierRegisterFormStep step={2} />
        </div>
        <FormProvider {...formMethods}>
          <SupplierBusinessInfoForm title="Business Profile" onSubmit={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
