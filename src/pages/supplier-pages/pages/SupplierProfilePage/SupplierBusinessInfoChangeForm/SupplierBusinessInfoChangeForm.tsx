import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { UploadImage } from '../../../../../components';
import { Action } from '../../../../../services/user/user.service';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../supplier-pages-common';

import style from './SupplierBusinessInfoChangeForm.module.scss';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const formMethods = useForm<ISupplierBusinessInfoFormValues>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      description: '',
      tel: '',
      yearEstablished: null,
      address: '',
      isManufacturer: false,
      numEmployees: '',
      storeName: '',
      businessSector: null,
      license: '',
    },
  });

  return (
    <>
      <p className={style.subtitle}>Business Profile</p>
      <UploadImage
        action={Action.UPLOAD_LOGO_IMAGE}
        type="logo"
        label="Add logo or profile image"
        placeholder="The customers will recognize your store by this image"
      />
      <FormProvider {...formMethods}>
        <SupplierBusinessInfoForm
          updateForm
          onSubmit={(data: any) => console.log(data)}
        />
      </FormProvider>
    </>
  );
};
