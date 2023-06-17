import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { UploadImage } from '../../../../../components';
import { Action } from '../../../../../services/user/user.service';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../../supplier-pages-common';

import style from './SupplierBusinessInfoChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ISuppliersUpdateCompanyInfo } from 'services/supplier/supplier.serviceTypes';
import { getCompanyInfo } from 'store/reducers/supplier/profile';
import { supplierBusinessProfileInfoSelector } from 'store/reducers/supplier/profile/selectors';
import { updateCompanyInfo } from 'store/reducers/supplier/profile/thunks';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyInfoSelector = useAppSelector(supplierBusinessProfileInfoSelector);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, []);

  useEffect(() => {
    reset(companyInfoSelector);
  }, [companyInfoSelector]);

  const formMethods = useForm<ISupplierBusinessInfoFormValues>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const { reset } = formMethods;

  const onSubmit = async (data: ISupplierBusinessInfoFormValues): Promise<void> => {
    const updateData: ISuppliersUpdateCompanyInfo = {
      supplier_data_request: {
        license_number: data.licenseNumber,
      },
      company_data_request: {
        business_email: data.businessEmail,
        business_sector: data.businessSector.value,
        country_id: data.countryRegistration.value,
        is_manufacturer: data.isManufacturer,
        address: data.address,
        number_employees: data.numberEmployees,
        year_established: data.yearEstablished,
        name: data.shopName,
        description: data.description,
      },
      company_phone_data_request: {
        // todo fix the stub
        phone_number: '+375298884242',
        country_id: 1,
      },
    };

    dispatch(updateCompanyInfo(updateData));
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
        <SupplierBusinessInfoForm updateForm onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
};
