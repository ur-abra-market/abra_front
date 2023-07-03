import React, { useEffect, useState } from 'react';

import style from './CheckDelivery.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { Address } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/Address/Address';
import { makeMainAddressFirst } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/helpers/makeMainAddressFirst';
import { SellerAddAddressChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerAddresses/SellerAddAddressChangeForm/SellerAddAddressChangeForm';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';
import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

const CheckDelivery = (): JSX.Element => {
  const { addresses } = useAppSelector(state => state.sellerProfile);
  const sortedAddresses: ISellerAddressData[] | undefined = makeMainAddressFirst(
    addresses!,
  );

  const dispatch = useAppDispatch();
  const [addModal, setAddModal] = useState(false);
  const onClick = (): void => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    dispatch(getSellerAddresses());
    // dispatch(getSellerInfoService());
  }, [dispatch]);

  return (
    <div className={style.check_delivery}>
      <h4 className={style.check_delivery_title}>Delivery Address</h4>
      <div className={style.check_delivery_address}>
        {addresses &&
          sortedAddresses?.map(address => <Address key={address.id} address={address} />)}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={style.check_delivery_add} onClick={onClick}>
          + Add an address
        </div>
      </div>
      <Modal showModal={addModal} closeModal={setAddModal}>
        <SellerAddAddressChangeForm />
      </Modal>
    </div>
  );
};

export default CheckDelivery;
