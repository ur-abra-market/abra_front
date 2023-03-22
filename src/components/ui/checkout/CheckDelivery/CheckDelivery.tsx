import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { address } from '../../../../store/reducers/modalSlice';
import Address from '../../../Address';

import style from './CheckDelivery.module.css';

const CheckDelivery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(state => state.modal.addresses);

  return (
    <div className={style.check_delivery}>
      <h4 className={style.check_delivery_title}>Delivery Address</h4>
      <div className={style.check_delivery_address}>
        {addresses.map((a: any, i: number) => (
          <Address key={`address_${i}`} address={a} />
        ))}
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={style.check_delivery_add} onClick={() => dispatch(address(true))}>
        + Add an address
      </div>
    </div>
  );
};

export default CheckDelivery;
