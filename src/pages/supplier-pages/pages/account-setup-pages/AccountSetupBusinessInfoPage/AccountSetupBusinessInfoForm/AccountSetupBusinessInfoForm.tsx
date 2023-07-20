import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import style from './AccountSetupBusinessInfoForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ISupplierBusinessInfoFormData, LoadingStatusEnum } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
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
import { LoaderLinear } from 'ui-kit';

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
        business_email: data.email,
        business_sector: data.businessSector.value,
        country_id: data.countryRegistration!,
        is_manufacturer: false, // TODO
        address: data.address,
        number_employees: Number(data.numEmployees!),
        year_established: Number(data.yearEstablished!),
        name: data.storeName,
        description: data.description,
      },
      company_phone_data_request: {
        phone_number: numberBody,
        country_id: data.countryId!,
      },
      file: logo,
    };

    const formData = new FormData();

    formData.append(
      'supplier_data_request',
      JSON.stringify(businessInfoData.supplier_data_request),
    );
    formData.append(
      'company_data_request',
      JSON.stringify(businessInfoData.company_data_request),
    );
    formData.append(
      'company_phone_data_request',
      JSON.stringify(businessInfoData.company_phone_data_request),
    );
    if (businessInfoData.file) {
      formData.append('file', businessInfoData.file!);
    }

    const result = await dispatch(createAccountBusinessInfo(formData));

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
        <p className={style.subtitle}>Business Profile</p>

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
