import { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { AddressesChangeForm } from 'modules/AddressesChangeForm/AddressesChangeForm';
import { addressFormValidationSchema } from 'modules/AddressesChangeForm/AddressFormValidationSchema';
import { ISellerAddressRequest } from 'services/seller/seller.serviceTypes';
import { countriesSelector } from 'store/reducers/commonSlice';
import { ISellerAddress } from 'store/reducers/seller/profile/slice';
import { addSellerAddresses } from 'store/reducers/seller/profile/thunks';

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

    // const countryId = countries.find(el => el.country === data.country)?.id!;
    const phoneCountryId = countries.find(el => el.country_code === countryCode)?.id;

    const updateSellerAddressData: ISellerAddressRequest = {
      seller_address_request: {
        is_main: data.isMain || false,
        area: data.area,
        city: data.city,
        street: data.street,
        building: data.building,
        apartment: data.apartment,
        postal_code: data.postalCode,
        country_id: data.country,
        first_name: data.firstName,
        last_name: data.lastName,
      },
      seller_address_phone_request: {
        country_id: phoneCountryId!,
        phone_number: numberBody,
      },
    };

    await dispatch(addSellerAddresses(updateSellerAddressData));
    if (closeModal) {
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
