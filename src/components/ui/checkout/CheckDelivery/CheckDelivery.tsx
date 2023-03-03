import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { address } from '../../../../store/reducers/modalSlice';
import Address from '../../../Address';

import style from './CheckDelivery.module.css';

const CheckDelivery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(state => state.modal.addresses);

  return (
    <div className={style.checkDelivery}>
      <h4>Delivery Address</h4>
      <div className={style.checkDelivery_address}>
        {addresses.map((a: any, i: number) => (
          <Address key={`address_${i}`} address={a} />
        ))}
      </div>
      <div className={style.checkDelivery_add} onClick={() => dispatch(address(true))}>
        + Add an address
      </div>
    </div>
  );
};

export default CheckDelivery;
