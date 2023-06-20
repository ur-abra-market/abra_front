import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { UploadImage } from '../../../../../components';
import { ISuppliersUpdateCompanyInfo } from '../../../../../services/supplier/supplier.serviceTypes';
import { Action } from '../../../../../services/user/user.service';
import { countriesSelector } from '../../../../../store/reducers/commonSlice';
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
  const countries = useAppSelector(countriesSelector);
  const numberCountry = countries.find(
    c => c.country_short === businessInfoData.countryShort,
  );

  useEffect(() => {
    dispatch(getBusinessInfo());
  }, []);

  useEffect(() => {
    reset(businessInfoData);
    setValue(
      'phoneNumber',
      `${numberCountry?.country_code}${businessInfoData.phoneNumber}`,
    );
  }, [businessInfoData]);

  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const { reset, setValue } = formMethods;

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
        // todo fix the stub
        phone_number: data.phoneNumber,
        country_id: data.phoneId!,
      },
    };

    dispatch(updateBusinessInfo(updateData));
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
