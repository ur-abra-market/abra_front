import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { getAddress } from '../../../../store/reducers/sellerCheckoutSlice';
import { getSellerInfoService } from '../../../../store/reducers/sellerSlice';
import CheckoutAddress from '../../../CheckoutAddress/CheckoutAddress';
import AddressPopup from '../../popup/AddressPopup';

import style from './CheckDelivery.module.css';

const CheckDelivery = (): JSX.Element => {
  const { addresses } = useAppSelector(state => state.sellerCheckout);
  const [selectedAddress, setSelectedAddress] = useState<number>();
  const dispatch = useAppDispatch();
  const [AddModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const onClick = (): void => {
    setAddModal(!AddModal);
  };

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getSellerInfoService());
  }, [dispatch]);
  const handleOnClick = (id: number): void => {
    setSelectedAddress(id);
  };

  const onClickModal = (): void => {
    setEditModal(!editModal);
  };

  return (
    <div className={style.check_delivery}>
      <h4 className={style.check_delivery_title}>Delivery Address</h4>
      <div className={style.check_delivery_address}>
        {addresses &&
          addresses.map((address, i) => (
            <CheckoutAddress
              key={`address_${i}`}
              address={address}
              onClick={() => handleOnClick(address.id)}
              selected={selectedAddress === address.id}
              openModal={() => onClickModal()}
              modal={editModal}
            />
          ))}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={style.check_delivery_add} onClick={onClick}>
          + Add an address
        </div>
      </div>
      <AddressPopup modal={AddModal} setAddModal={setAddModal} />
    </div>
  );
};

export default CheckDelivery;
