import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { AddressesChangeForm } from 'modules/AddressesChangeForm/AddressesChangeForm';
import { addressFormValidationSchema } from 'modules/AddressesChangeForm/AddressFormValidationSchema';
import {
  ISellerAddressData,
  ISellerAddressRequest,
} from 'services/seller/seller.serviceTypes';
import { countriesSelector } from 'store/reducers/commonSlice';
import { ISellerAddress } from 'store/reducers/seller/profile/slice';
import { updateSellerAddresses } from 'store/reducers/seller/profile/thunks';

interface ISellerEditAddressChangeForm {
  address: ISellerAddressData;
  closeModal?: (modal: boolean) => void;
}

export const SellerEditAddressChangeForm: FC<ISellerEditAddressChangeForm> = ({
  address,
  closeModal,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const countries = useAppSelector(countriesSelector);

  const formMethods = useForm<ISellerAddress>({
    mode: 'onChange',
    resolver: yupResolver(addressFormValidationSchema),
  });

  const {
    watch,
    formState: { isValid },
    setValue,
  } = formMethods;

  const phoneNumberValue = watch('phoneNumber');

  const { numberFull: currentPhoneNumber } = parsePhoneNumber(phoneNumberValue || '');
  const serverPhoneNumber = `${address.phone.country.country_code}${address.phone.phone_number}`;

  const [
    firstNameValue,
    lastNameValue,
    countryValue,
    cityValue,
    buildingValue,
    streetValue,
    apartmentValue,
    areaValue,
    isMainValue,
    postalCodeValue,
  ] = watch([
    'firstName',
    'lastName',
    'country',
    'city',
    'building',
    'street',
    'apartment',
    'area',
    'isMain',
    'postalCode',
  ]);

  const isAddressFormDisable =
    firstNameValue === address?.first_name &&
    lastNameValue === address?.last_name &&
    `${address?.phone.country.country_code}${address?.phone.phone_number}` ===
      currentPhoneNumber &&
    countryValue === address?.country.id &&
    cityValue === address?.city &&
    buildingValue === address?.building &&
    streetValue === address?.street &&
    apartmentValue === address?.apartment &&
    areaValue === address?.area &&
    isMainValue === address?.is_main &&
    postalCodeValue === address?.postal_code;

  const onSubmit = async (data: ISellerAddress): Promise<void> => {
    if (!isValid) return;

    let phoneNumberBody: string | undefined;
    let phoneCountryCode: string | undefined;

    if (currentPhoneNumber !== serverPhoneNumber) {
      const { numberBody, countryCode } = parsePhoneNumber(data.phoneNumber);

      phoneNumberBody = numberBody;
      phoneCountryCode = countryCode;
    }

    const phoneCountryId = countries.find(el => el.country_code === phoneCountryCode)?.id;
    const updateSellerAddressData: ISellerAddressRequest = {
      address_id: address.id,
      seller_address_request: {
        is_main: data.isMain,
        city: data.city,
        street: data.street,
        postal_code: data.postalCode,
        country_id: data.country,
        first_name: data.firstName,
        last_name: data.lastName,
        ...(data.area && { area: data.area }),
        ...(data.building && { building: data.building }),
        ...(data.apartment && { apartment: data.apartment }),
      },
      seller_address_phone_request: {
        country_id: phoneCountryId! || address.phone.country.id,
        phone_number: phoneNumberBody || address.phone.phone_number,
      },
    };

    await dispatch(updateSellerAddresses(updateSellerAddressData));
    if (closeModal) {
      closeModal(false);
    }
  };

  useEffect(() => {
    setValue(
      'phoneNumber',
      `${address.phone.country.country_code}${address.phone.phone_number}`,
    );
    setValue('country', address.country.id);
    setValue('isMain', address.is_main);
  }, [
    address.phone.country.country_code,
    address.phone.phone_number,
    address.country.id,
    address.is_main,
    setValue,
  ]);

  return (
    <FormProvider {...formMethods}>
      <AddressesChangeForm
        onSubmit={onSubmit}
        address={address}
        isEditForm
        isAddressFormDisable={isAddressFormDisable}
      />
    </FormProvider>
  );
};
