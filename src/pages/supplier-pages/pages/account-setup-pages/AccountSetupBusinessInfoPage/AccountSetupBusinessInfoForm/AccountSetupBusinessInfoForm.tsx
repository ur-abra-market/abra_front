import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { UploadImage } from '../../../../../../components';
import { Action } from '../../../../../../services/user/user.service';
import { SupplierRegisterFormStep } from '../../../../../../ui-kit';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../../supplier-pages-common';

import style from './AccountSetupBusinessInfoForm.module.scss';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
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
      countryRegistration: null,
    },
  });

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
        <p className={style.subtitle}>Business Profile</p>

        <div className={style.add_logo}>
          <UploadImage
            action={Action.UPLOAD_LOGO_IMAGE}
            type="logo"
            label="Add logo or profile image"
            placeholder="The customers will recognize your store by this image"
          />
        </div>

        <FormProvider {...formMethods}>
          <SupplierBusinessInfoForm onSubmit={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
