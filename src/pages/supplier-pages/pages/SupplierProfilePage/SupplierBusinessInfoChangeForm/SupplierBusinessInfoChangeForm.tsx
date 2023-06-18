import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { UploadImage } from '../../../../../components';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../supplier-pages-common';

import style from './SupplierBusinessInfoChangeForm.module.scss';

import { useAppDispatch } from 'common/hooks';
import {
  supplierCompanyImageIdSelector,
  supplierCompanyImageSelector,
} from 'store/reducers/supplier/profile/selectors';
import {
  deleteCompanyImage,
  uploadCompanyImage,
} from 'store/reducers/supplier/profile/thunks';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyLogo = useSelector(supplierCompanyImageSelector);
  const companyLogoId = useSelector(supplierCompanyImageIdSelector);
  const formMethods = useForm<ISupplierBusinessInfoFormValues>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const handleUploadImage = (img: File): void => {
    dispatch(uploadCompanyImage(img));
  };
  const handleDeleteImage = (): void => {
    dispatch(deleteCompanyImage(companyLogoId));
  };

  return (
    <>
      <p className={style.subtitle}>Business Profile</p>
      <UploadImage
        image={companyLogo}
        type="logo"
        label="Add logo or profile image"
        placeholder="The customers will recognize your store by this image"
        uploadImage={handleUploadImage}
        deleteImage={handleDeleteImage}
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
