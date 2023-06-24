import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../../../common/hooks';
import { UploadImage } from '../../../../../../components';
import { IBusinessInfoRequestData } from '../../../../../../services/auth/auth.serviceTypes';
import { Action } from '../../../../../../services/user/user.service';
import { createAccountBusinessInfo } from '../../../../../../store/reducers/authSlice/thunks';
import { getCountries } from '../../../../../../store/reducers/commonSlice';
import { ISupplierBusinessInfo } from '../../../../../../store/reducers/supplier/profile/slice';
import { SupplierRegisterFormStep } from '../../../../../../ui-kit';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../../supplier-pages-common';

import style from './AccountSetupBusinessInfoForm.module.scss';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onSubmit = (data: ISupplierBusinessInfo): void => {
    const businessInfoData: IBusinessInfoRequestData = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        business_email: data.email,
        business_sector: data.businessSector.value,
        country_id: data.countryRegistration!,
        is_manufacturer: false,
        address: data.address,
        number_employees: +data.numEmployees!,
        year_established: +data.yearEstablished!,
        name: data.storeName,
        description: data.description,
        logo_url: 'asd',
      },
      company_phone_data_request: {
        phone_number: '338808800',
        country_id: data.id!,
      },
    };

    dispatch(createAccountBusinessInfo(businessInfoData)); // сделать переход после того как форма удачно отправится
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
          <SupplierBusinessInfoForm onSubmit={onSubmit} updateForm />
        </FormProvider>
      </div>
    </div>
  );
};
