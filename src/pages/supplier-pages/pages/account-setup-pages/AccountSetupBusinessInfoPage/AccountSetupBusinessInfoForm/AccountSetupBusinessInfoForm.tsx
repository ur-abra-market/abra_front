import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../../../../common/hooks';
import { UploadImage } from '../../../../../../components';
import { createAccountBusinessInfo } from '../../../../../../store/reducers/authSlice/thunks';
import { SupplierRegisterFormStep } from '../../../../../../ui-kit';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../../supplier-pages-common';

import style from './AccountSetupBusinessInfoForm.module.scss';

import { uploadCompanyImage } from 'store/reducers/supplier/profile';
import {
  supplierCompanyImageIdSelector,
  supplierCompanyImageSelector,
} from 'store/reducers/supplier/profile/selectors';
import { deleteCompanyImage } from 'store/reducers/supplier/profile/thunks';

export const AccountSetupBusinessInfoForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyLogo = useSelector(supplierCompanyImageSelector);
  const companyLogoId = useSelector(supplierCompanyImageIdSelector);
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
      countryRegistration: null,
    },
  });

  const onSubmit = (data: ISupplierBusinessInfoFormValues): void => {
    console.log(data);

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
    dispatch(uploadCompanyImage(img));
  };
  const handleDeleteImage = (): void => {
    dispatch(deleteCompanyImage(companyLogoId));
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
          />
        </div>

        <FormProvider {...formMethods}>
          <SupplierBusinessInfoForm onSubmit={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
