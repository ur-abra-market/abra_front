import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getAddress } from '../../../../store/reducers/sellerCheckoutSlice';
import Address from '../../../Address';
import AddressPopup from '../../popup/AddressPopup';

import style from './CheckDelivery.module.css';

const CheckDelivery = (): JSX.Element => {
  const addresses = useAppSelector(state => state.sellerCheckout.seller_address);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const onClick = (): void => {
    setModal(true);
  };

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  return (
    <div className={style.check_delivery}>
      <h4 className={style.check_delivery_title}>Delivery Address</h4>
      <div className={style.check_delivery_address}>
        {addresses.map((a, i) => (
          <Address key={`address_${i}`} address={a} />
        ))}

        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={style.check_delivery_add} onClick={onClick}>
          + Add an address
        </div>
      </div>
      <AddressPopup modal={modal} setModal={setModal} />
    </div>
  );
};

export default CheckDelivery;
