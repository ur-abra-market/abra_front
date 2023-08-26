import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import style from './SupplierBusinessInfoChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSupplierBusinessInfoFormDirty } from 'common/hooks/useSupplierBusinessInfoFormDirty';
import { useSupplierBusinessInfoSetValue } from 'common/hooks/useSupplierBusinessInfoSetValue';
import { ISupplierBusinessInfoFormData, LoadingStatusEnum } from 'common/types';
import { UploadImage } from 'elements';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from 'pages/supplier-pages/supplier-pages-common';
import { ISupplierUpdateBusinessInfo } from 'services/supplier/supplier.serviceTypes';
import {
  supplierBusinessInfoSelector,
  supplierCompanyLogoSelector,
  supplierLoadingSelector,
  updateBusinessInfo,
} from 'store/reducers/supplier/profile';
import { updateCompanyLogo } from 'store/reducers/supplier/profile/thunks';
import { ITestSupplierBusinessInfo } from 'store/reducers/supplier/profile/types';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const businessInfoData = useAppSelector(supplierBusinessInfoSelector);
  const companyLogo = useSelector(supplierCompanyLogoSelector);
  const supplierLoading = useAppSelector(supplierLoadingSelector);

  const isDisabled = supplierLoading.companyLogoLoading === LoadingStatusEnum.Loading;

  const formMethods = useForm<ISupplierBusinessInfoFormData>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'all',
  });
  const { setValue, watch } = formMethods;

  const handleUpdateImage = (image: File): void => {
    dispatch(updateCompanyLogo(image));
  };

  useSupplierBusinessInfoSetValue(setValue, businessInfoData);

  const isDirty = useSupplierBusinessInfoFormDirty(businessInfoData, watch);

  const onSubmit = async (data: ITestSupplierBusinessInfo): Promise<void> => {
    const updateData: ISupplierUpdateBusinessInfo = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        name: data.storeName,
        business_sector: data.businessSector,
        is_manufacturer: data.isManufacturer,
        year_established: Number(data.yearEstablished!),
        number_employees: Number(data.numberEmployees!),
        country_id: data.countryRegistration!,
        ...(data.description && { description: data.description }),
        ...(data.businessEmail && { business_email: data.businessEmail }),
        ...(data.companyAddress && { address: data.companyAddress }),
      },
      ...(data.businessPhoneNumberBody && {
        company_phone_data_request: {
          phone_number: data.businessPhoneNumberBody,
          country_id: data.businessPhoneNumberCountryId,
        },
      }),
    };

    await dispatch(updateBusinessInfo(updateData));
  };

  return (
    <>
      <p className={style.subtitle}>Business Profile</p>
      <UploadImage
        image={companyLogo}
        uploadImage={handleUpdateImage}
        type="logo"
        label="Add logo or profile image (optional)"
        placeholder="The customers will recognize your store by this image"
        description="company logo"
        isDisabled={isDisabled}
      />

      <FormProvider {...formMethods}>
        <SupplierBusinessInfoForm isDirty={isDirty} updateForm onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
};
