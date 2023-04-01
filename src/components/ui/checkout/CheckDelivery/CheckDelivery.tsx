import React, { useState } from 'react';

import { useAppSelector } from '../../../../store/hooks';
import Address from '../../../Address';
import AddressPopup from '../../popup/AddressPopup';

import style from './CheckDelivery.module.css';

const CheckDelivery = (): JSX.Element => {
  const addresses = useAppSelector(state => state.sellerCheckout.addressData); // ниже заглушка пока нет данных с сервера
  // const addresses = useAppSelector(state => state.modal.addresses);
  const [modal, setModal] = useState(false);

  const onClick = (): void => {
    setModal(true);
  };

  return (
    <div className={style.check_delivery}>
      <h4 className={style.check_delivery_title}>Delivery Address</h4>
      <div className={style.check_delivery_address}>
        {addresses.map((a: any, i: number) => (
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
