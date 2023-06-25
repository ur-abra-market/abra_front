import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { parsePhoneNumber } from '../../../../../common/utils/parsePhoneNumber';
import { UploadImage } from '../../../../../components';
import { ISuppliersUpdateCompanyInfo } from '../../../../../services/supplier/supplier.serviceTypes';
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

import {
  supplierCompanyLogoIdSelector,
  supplierCompanyLogoSelector,
} from 'store/reducers/supplier/profile/selectors';
import {
  deleteCompanyLogo,
  uploadCompanyLogo,
} from 'store/reducers/supplier/profile/thunks';

export const SupplierBusinessInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const businessInfoData = useAppSelector(supplierBusinessInfoSelector);
  const companyLogo = useSelector(supplierCompanyLogoSelector);
  const companyLogoId = useSelector(supplierCompanyLogoIdSelector);

  const {
    phoneNumber,
    businessSector,
    countryCode,
    countryRegistration,
    address,
    isManufacturer,
    email,
    description,
    numEmployees,
    license,
    yearEstablished,
    storeName,
  } = businessInfoData;

  const handleUploadImage = (image: File): void => {
    dispatch(uploadCompanyLogo(image));
  };
  const handleDeleteImage = (): void => {
    if (companyLogoId !== null) dispatch(deleteCompanyLogo(companyLogoId));
  };

  useEffect(() => {
    dispatch(getBusinessInfo());
  }, []);

  useEffect(() => {
    reset(businessInfoData);
    setValue('phoneNumber', `${businessInfoData.countryCode}${phoneNumber}`);
  }, [businessInfoData]);

  const formMethods = useForm<ISupplierBusinessInfo>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
  });
  const { reset, setValue, watch } = formMethods;

  const [
    licenseNumber,
    emailData,
    businessSectorData,
    phoneNumberData,
    countryRegistrationData,
    isManufacturerData,
    addresData,
    numberEmployees,
    yearEstablishedData,
    store,
    descriptionData,
  ] = watch([
    'license',
    'email',
    'businessSector.value',
    'phoneNumber',
    'countryRegistration',
    'isManufacturer',
    'address',
    'numEmployees',
    'yearEstablished',
    'storeName',
    'description',
    'phoneNumber',
  ]);

  const isBusinessInfoFormDisable =
    store === storeName &&
    businessSectorData === businessSector.value &&
    isManufacturerData === isManufacturer &&
    licenseNumber === license &&
    yearEstablishedData === yearEstablished &&
    numberEmployees === numEmployees &&
    countryRegistrationData === countryRegistration &&
    descriptionData === description &&
    emailData === email &&
    phoneNumberData === `${countryCode}${phoneNumber}` &&
    addresData === address;

  const onSubmit = async (data: ISupplierBusinessInfo): Promise<void> => {
    const { numberBody } = parsePhoneNumber(data.phoneNumber);
    const updateData: ISuppliersUpdateCompanyInfo = {
      supplier_data_request: {
        license_number: data.license,
      },
      company_data_request: {
        business_email: data.email,
        business_sector: data.businessSector.value,
        country_id: data.countryRegistration!,
        is_manufacturer: data.isManufacturer,
        address: data.address,
        number_employees: Number(data.numEmployees!),
        year_established: Number(data.yearEstablished!),
        name: data.storeName,
        description: data.description,
      },
      company_phone_data_request: {
        phone_number: numberBody,
        country_id: data.phoneId!,
      },
    };

    await dispatch(updateBusinessInfo(updateData));
  };

  return (
    <>
      <p className={style.subtitle}>Business Profile</p>
      <UploadImage
        image={companyLogo}
        type="logo"
        label="Add logo or profile image"
        placeholder="The customers will recognize your store by this image"
        uploadImage={handleUploadImage}
        deleteImage={handleDeleteImage}
        description="company logo"
      />
      <FormProvider {...formMethods}>
        <SupplierBusinessInfoForm
          updateForm
          onSubmit={onSubmit}
          countryShort={businessInfoData.countryShort}
          isDisabled={isBusinessInfoFormDisable}
        />
      </FormProvider>
    </>
  );
};
