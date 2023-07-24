import { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { parsePhoneNumber } from 'common/utils';
import { AddressesChangeForm } from 'modules/AddressesChangeForm/AddressesChangeForm';
import { addressFormValidationSchema } from 'modules/AddressesChangeForm/AddressFormValidationSchema';
import { ISellerAddressRequest } from 'services/seller/seller.serviceTypes';
import { countriesSelector } from 'store/reducers/commonSlice';
import { createSellerAddresses, ISellerAddress } from 'store/reducers/seller/profile';

interface ISellerAddAddressChangeForm {
  closeModal?: (modal: boolean) => void;
}

export const SellerAddAddressChangeForm: FC<ISellerAddAddressChangeForm> = ({
  closeModal,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(countriesSelector);

  const formMethods = useForm<ISellerAddress>({
    mode: 'onChange',
    resolver: yupResolver(addressFormValidationSchema),
  });

  const {
    setValue,
    formState: { isValid },
  } = formMethods;

  const onSubmit = async (data: ISellerAddress): Promise<void> => {
    if (!isValid) return;
    const { numberBody, countryCode } = parsePhoneNumber(data.phoneNumber);

    const phoneCountryId = countries.find(el => el.country_code === countryCode)?.id;

    const updateSellerAddressData: ISellerAddressRequest = {
      seller_address_request: {
        is_main: data.isMain || false,
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
        country_id: phoneCountryId!,
        phone_number: numberBody,
      },
    };

    const actionResult = await dispatch(createSellerAddresses(updateSellerAddressData));

    if (createSellerAddresses.fulfilled.match(actionResult) && closeModal) {
      closeModal(false);
    }
  };

  useEffect(() => {
    setValue('isMain', false);
  }, [setValue]);

  return (
    <FormProvider {...formMethods}>
      <AddressesChangeForm closeModal={closeModal} onSubmit={onSubmit} />
    </FormProvider>
  );
};
