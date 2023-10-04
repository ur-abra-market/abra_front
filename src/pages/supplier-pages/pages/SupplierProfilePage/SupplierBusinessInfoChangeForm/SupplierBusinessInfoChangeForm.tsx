import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import style from './SupplierBusinessInfoChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSupplierBusinessInfoFormDirty } from 'common/hooks/useSupplierBusinessInfoFormDirty';
import { useSupplierBusinessInfoSetValue } from 'common/hooks/useSupplierBusinessInfoSetValue';
import { ISupplierBusinessInfoFormData, LoadingStatusEnum } from 'common/types';
import { parsePhoneNumber } from 'common/utils';
import { UploadImage } from 'elements';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from 'pages/supplier-pages/supplier-pages-common';
import { ISupplierUpdateBusinessInfo } from 'services/supplier/supplier.serviceTypes';
import {
  supplierBusinessInfoSelector,
  updateBusinessInfo,
  supplierCompanyLogoSelector,
  supplierLoadingSelector,
} from 'store/reducers/supplier/profile';
import { updateCompanyLogo } from 'store/reducers/supplier/profile/thunks';
import { Title } from 'ui-kit';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const businessInfoData = useAppSelector(supplierBusinessInfoSelector);
  const companyLogo = useSelector(supplierCompanyLogoSelector);
  const supplierLoading = useAppSelector(supplierLoadingSelector);

  const isDisabled = supplierLoading.companyLogoLoading === LoadingStatusEnum.Loading;

  const formMethods = useForm<ISupplierBusinessInfoFormData>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const { setValue, watch } = formMethods;

  const handleUpdateImage = (image: File): void => {
    dispatch(updateCompanyLogo(image));
  };

  useSupplierBusinessInfoSetValue(setValue, businessInfoData);

  const { isDirty, isPhoneNumberDisable } = useSupplierBusinessInfoFormDirty(
    businessInfoData,
    watch,
  );

  const onSubmit = async (data: ISupplierBusinessInfoFormData): Promise<void> => {
    const numberBody = data.phoneNumber && parsePhoneNumber(data.phoneNumber).numberBody;
    const currentPhoneNumber = isPhoneNumberDisable
      ? businessInfoData.phoneNumber
      : numberBody;

    const updateData: ISupplierUpdateBusinessInfo = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        ...(data.email && { business_email: data.email }),
        country_id: data.countryRegistration!,
        is_manufacturer: data.isManufacturer,
        ...(data.address && { address: data.address }),
        employees_number_id: Number(data.numEmployees!),
        year_established: Number(data.yearEstablished!),
        name: data.storeName,
        ...(data.description && { description: data.description }),
      },
      business_sectors_request: {
        business_sectors: [Number(data.businessSector)],
      },
      ...(data.countryId &&
        currentPhoneNumber && {
          company_phone_data_request: {
            phone_number: currentPhoneNumber,
            country_id: data.countryId,
          },
        }),
    };

    await dispatch(updateBusinessInfo(updateData));
  };

  return (
    <>
      <Title as="h2" size="s" className={style.subtitle}>
        Business Profile
      </Title>
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
        <SupplierBusinessInfoForm
          isDirty={isDirty}
          updateForm
          onSubmit={onSubmit}
          countryShort={businessInfoData.countryShort}
          isPhoneNumber={isPhoneNumberDisable}
        />
      </FormProvider>
    </>
  );
};
