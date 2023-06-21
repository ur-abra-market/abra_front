import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { UploadImage } from '../../../../../components';
import { ISuppliersUpdateCompanyInfo } from '../../../../../services/supplier/supplier.serviceTypes';
import { Action } from '../../../../../services/user/user.service';
import {
  getBusinessInfo,
  supplierBusinessInfoSelector,
  updateBusinessInfo,
} from '../../../../../store/reducers/supplier/profile';
import { ISupplierBusinessInfo } from '../../../../../store/reducers/supplier/profile/slice';
import {
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../supplier-pages-common';

import style from './SupplierBusinessInfoChangeForm.module.scss';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const businessInfoData = useAppSelector(supplierBusinessInfoSelector);

  useEffect(() => {
    dispatch(getBusinessInfo());
  }, []);

  useEffect(() => {
    reset(businessInfoData);
  }, [businessInfoData]);

  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const { reset } = formMethods;

  const onSubmit = async (data: ISupplierBusinessInfo): Promise<void> => {
    const updateData: ISuppliersUpdateCompanyInfo = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        business_email: data.email,
        business_sector: data.businessSector.value,
        country_id: data.countryRegistration.value!,
        is_manufacturer: data.isManufacturer,
        address: data.address,
        number_employees: data.numEmployees!,
        year_established: data.yearEstablished!,
        name: data.storeName,
        description: data.description,
      },
      company_phone_data_request: {
        phone_number: data.phoneNumber.replace(/ /g, '').replace(/\(|\)/g, ''),
        country_id: data.id!,
      },
    };

    await dispatch(updateBusinessInfo(updateData));
  };

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
          onSubmit={onSubmit}
          countryShort={businessInfoData.countryShort}
        />
      </FormProvider>
    </>
  );
};
