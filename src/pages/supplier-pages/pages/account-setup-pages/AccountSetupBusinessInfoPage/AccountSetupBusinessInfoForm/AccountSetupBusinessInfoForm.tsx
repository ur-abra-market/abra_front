import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../../../../common/hooks';
import { UploadImage } from '../../../../../../components';
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
  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onSubmit = (data: ISupplierBusinessInfo): void => {
    const businessInfoData = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        phone_country_code: '+7',
        phone_number: '9657566767',
        name: data.storeName,
        is_manufacturer: data.isManufacturer,
        year_established: data.yearEstablished,
        number_employees: data.numEmployees,
        description: data.description,
        address: data.address,
        logo_url: '',
        business_sector: data.businessSector,
        business_email: data.email,
        country_id: data.countryRegistration,
      },
    };

    dispatch(createAccountBusinessInfo(businessInfoData)); // сделать переход после того как форма удачно отправится
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
