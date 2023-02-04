import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { address } from '../../../../store/reducers/modalSlice';
import Address from '../../../Address';

import style from './CheckDelivery.module.css';

const CheckDelivery = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.modal.addresses);

  return (
    <div className={style.checkDelivery}>
      <h4>Delivery Address</h4>
      <div className={style.checkDelivery_address}>
        {addresses.map((a, i) => (
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
