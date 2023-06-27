import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { parsePhoneNumber } from '../../../../../common/utils/parsePhoneNumber';
import { AddressesChangeForm } from '../../../../../modules/AddressesChangeForm/AddressesChangeForm';
import { countriesSelector } from '../../../../../store/reducers/commonSlice';
import { IAddress } from '../../../../../store/reducers/seller/profile/slice';
import { deleteAddress } from '../../../../../store/reducers/sellerCheckoutSlice';
import { addressFormValidationSchema } from '../AddressFormValidationSchema';

import style from './SellerEditAddressModal.module.css';

interface ISellerEditAddressChangeForm {
  address: IAddress;
}

const SellerEditAddressChangeForm: FC<ISellerEditAddressChangeForm> = ({
  address,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const countries = useAppSelector(countriesSelector);

  const numberCountry = countries.find(
    c => c.country_short === address.country.country_short,
  );

  const formMethods = useForm<any>({
    mode: 'all',
    defaultValues: { addressId: address.id },
    resolver: yupResolver(addressFormValidationSchema),
  });

  const {
    watch,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = formMethods;

  const phoneNumberValue = watch('phoneNumber');
  const { numberFull: currentPhoneNumber, countryCode: currentCountryCode } =
    parsePhoneNumber(phoneNumberValue || '');
  // const serverPhoneNumber = `${numberCountry?.country_code}${address.phone_number}`;
  const serverPhoneNumber = `${address.country.country_code}${address.phone_number}`;

  const onSubmit = async (data: any): Promise<void> => {
    if (!isValid) return;

    let phoneNumberBody;

    if (currentPhoneNumber !== serverPhoneNumber) {
      const { numberBody } = parsePhoneNumber(data.phoneNumber);

      phoneNumberBody = numberBody;
    }

    const updateSellerAddressData = {
      country_id: data.country || address.country.id,
      phone_number: phoneNumberBody || address.phone_number,
      address_id: data.addressId,
      is_main: data.isMain || address.is_main,
      first_name: data.firstName,
      last_name: data.lastName,
      area: data.area,
      city: data.city,
      street: data.street,
      building: data.building,
      apartment: data.apartment,
      postal_code: data.postalCode,
    };

    // dispatch(editAddress(updateSellerAddressData));
  };

  useEffect(() => {
    // setValue('phoneNumber', `${numberCountry?.country_code}${address.phone_number}`);
    setValue('phoneNumber', `${address.country.id}${address.phone_number}`);
  }, [address.phone_number]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.edit_address_modal}>
        <AddressesChangeForm address={address} isEditForm />
      </form>
    </FormProvider>
  );
};

export default SellerEditAddressChangeForm;
