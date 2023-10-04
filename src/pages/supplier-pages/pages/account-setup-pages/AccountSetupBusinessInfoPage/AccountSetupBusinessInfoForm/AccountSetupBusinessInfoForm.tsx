import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import style from './AccountSetupBusinessInfoForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ISupplierBusinessInfoFormData, LoadingStatusEnum } from 'common/types';
import { parsePhoneNumber } from 'common/utils';
import { UploadImage } from 'elements';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
  SupplierRegisterFormStep,
} from 'pages/supplier-pages/supplier-pages-common';
import { HOME } from 'routes';
import { IBusinessInfoRequest } from 'services/supplier/supplier.serviceTypes';
import { getCountries } from 'store/reducers/commonSlice';
import {
  createAccountBusinessInfo,
  ISupplierBusinessInfo,
  supplierLoadingSelector,
} from 'store/reducers/supplier/profile';
import { LoaderLinear, Title } from 'ui-kit';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logo, setLogo] = useState<File>();
  const urlImg = logo && URL.createObjectURL(logo);
  const { businessInfoLoading } = useAppSelector(supplierLoadingSelector);
  const isLoading = businessInfoLoading === LoadingStatusEnum.Loading;

  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const onSubmit = async (data: ISupplierBusinessInfoFormData): Promise<void> => {
    const numberBody = data.phoneNumber && parsePhoneNumber(data.phoneNumber).numberBody;
    const businessInfoData: IBusinessInfoRequest = {
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
        numberBody && {
          company_phone_data_request: {
            phone_number: numberBody,
            country_id: data.countryId,
          },
        }),
      file: logo,
    };

    const result = await dispatch(createAccountBusinessInfo(businessInfoData));

    if (createAccountBusinessInfo.fulfilled.match(result)) {
      navigate(HOME);
    }
  };
  const handleUploadImage = (img: File): void => {
    setLogo(img);
  };

  return (
    <div className={style.wrapper}>
      {isLoading && <LoaderLinear />}
      <div className={style.form_container}>
        <div className={style.step}>
          <SupplierRegisterFormStep step={2} />
        </div>
        <Title as="h2" size="s" className={style.subtitle}>
          Business Profile
        </Title>

        <div className={style.add_logo}>
          <UploadImage
            uploadImage={handleUploadImage}
            image={urlImg}
            type="logo"
            label="Add logo or profile image (optional)"
            placeholder="The customers will recognize your store by this image"
            description="company logo"
          />
        </div>

        <FormProvider {...formMethods}>
          <SupplierBusinessInfoForm onSubmit={onSubmit} updateForm />
        </FormProvider>
      </div>
    </div>
  );
};
