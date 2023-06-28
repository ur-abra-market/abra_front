import { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SellerAddAddressChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { AddressesChangeForm } from 'modules/AddressesChangeForm/AddressesChangeForm';
import { addressFormValidationSchema } from 'pages/seller-pages/SellerProfilePage/Addresses/AddressFormValidationSchema';
import { ISellerAddressData } from 'store/reducers/seller/profile/slice';

interface ISellerAddAddressChangeForm {
  closeModal?: (modal: boolean) => void;
}

export const SellerAddAddressChangeForm: FC<ISellerAddAddressChangeForm> = ({
  closeModal,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const formMethods = useForm<ISellerAddressData>({
    mode: 'all',
    resolver: yupResolver(addressFormValidationSchema),
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit = async (data: any): Promise<void> => {
    if (!isValid) return;
    // console.log(data);
    const { numberBody } = parsePhoneNumber(data.phoneNumber);

    // const updateSellerAddressData = { ...data, phone_number: numberBody };
    const updateSellerAddressData = {
      country_id: data.country,
      phone_number: numberBody,
      is_main: data.isMain || false,
      first_name: data.firstName,
      last_name: data.lastName,
      area: data.area,
      city: data.city,
      street: data.street,
      building: data.building,
      apartment: data.apartment,
      postal_code: data.postalCode,
    };

    console.log(data);
    // await dispatch(addSellerAddresses(updateSellerAddressData));
    // await reset();
    // if (closeModal) {
    //   closeModal(false);
    // }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.address_popup_modal}>
        <AddressesChangeForm closeModal={closeModal} />
      </form>
    </FormProvider>
  );
};
