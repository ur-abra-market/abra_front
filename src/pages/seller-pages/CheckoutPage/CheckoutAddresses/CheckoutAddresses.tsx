import React, { useEffect, useState } from 'react';

import style from './CheckoutAddresses.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { Address } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/Address/Address';
import { makeMainAddressFirst } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/helpers/makeMainAddressFirst';
import { SellerAddAddressChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/SellerAddAddressChangeForm/SellerAddAddressChangeForm';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';
import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

export const CheckoutAddresses = (): JSX.Element => {
  const { addresses } = useAppSelector(state => state.sellerProfile);
  const sortedAddresses: ISellerAddressData[] | undefined = makeMainAddressFirst(
    addresses!,
  );

  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const onClick = (): void => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getSellerAddresses());
  }, [dispatch]);

  return (
    <>
      <h4 className={style.title}>Delivery Address</h4>
      <div className={style.checkout_address}>
        {addresses &&
          sortedAddresses?.map(address => <Address key={address.id} address={address} />)}
        <button type="button" className={style.add_button} onClick={onClick}>
          + Add an address
        </button>
      </div>
      <Modal showModal={isModalOpen} closeModal={setModalOpen}>
        <SellerAddAddressChangeForm />
      </Modal>
    </>
  );
};
