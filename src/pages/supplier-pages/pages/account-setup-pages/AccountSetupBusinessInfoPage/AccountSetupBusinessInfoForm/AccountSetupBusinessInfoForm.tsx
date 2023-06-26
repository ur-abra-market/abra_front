import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../../../common/hooks';
import { parsePhoneNumber } from '../../../../../../common/utils/parsePhoneNumber';
import { UploadImage } from '../../../../../../components';
import { IBusinessInfoRequest } from '../../../../../../services/auth/auth.serviceTypes';
import { createAccountBusinessInfo } from '../../../../../../store/reducers/authSlice/thunks';
import { getCountries } from '../../../../../../store/reducers/commonSlice';
import { ISupplierBusinessInfo } from '../../../../../../store/reducers/supplier/profile/slice';
import { SupplierRegisterFormStep } from '../../../../../../ui-kit';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../../supplier-pages-common';

import style from './AccountSetupBusinessInfoForm.module.scss';

import { uploadCompanyLogo } from 'store/reducers/supplier/profile';
import {
  supplierCompanyLogoIdSelector,
  supplierCompanyLogoSelector,
} from 'store/reducers/supplier/profile/selectors';
import { deleteCompanyLogo } from 'store/reducers/supplier/profile/thunks';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
  const companyLogo = useSelector(supplierCompanyLogoSelector);
  const companyLogoId = useSelector(supplierCompanyLogoIdSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onSubmit = async (data: ISupplierBusinessInfo): Promise<void> => {
    const { numberBody } = parsePhoneNumber(data.phoneNumber);
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
        logo_url: 'logo.net', // TODO
      },
      company_phone_data_request: {
        phone_number: numberBody,
        country_id: data.phoneId!,
      },
    };

    const result = await dispatch(createAccountBusinessInfo(businessInfoData));

    if (createAccountBusinessInfo.fulfilled.match(result)) {
      navigate('/');
    }
  };
  const handleUploadImage = (img: File): void => {
    dispatch(uploadCompanyLogo(img));
  };
  const handleDeleteImage = (): void => {
    if (companyLogoId !== null) dispatch(deleteCompanyLogo(companyLogoId));
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
            uploadImage={handleUploadImage}
            deleteImage={handleDeleteImage}
            image={companyLogo}
            type="logo"
            label="Add logo or profile image"
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
