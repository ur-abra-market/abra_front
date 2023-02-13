import React, { FC } from 'react';

import style from './Address.module.css';

interface AddressProps {
  address: any;
}
const Address: FC<AddressProps> = ({ address }): JSX.Element => {
  const styles = {
    background: address.isMain ? '#f2f2f2' : '#ffffff',
    border: address.isMain ? '2px #000000 solid' : '2px #d6d6d6 solid',
  };
  const arrAddress = [
    address.street,
    address.apartment,
    address.city,
    address.region,
    address.state,
    address.country,
    address.zipcode,
  ];
  const arrFilter = arrAddress.filter(e => e !== '');

  return (
    <div className={style.address} style={styles}>
      <div className={style.address__content}>
        <div className={style.address__content_text}>
          {address.firstname} {address.lastname}, {address.phone}
        </div>
        <div className={style.address__content_edit} />
      </div>
      <div className={style.address_place}>{arrFilter.join(', ')}</div>
      <div
        className={style.address__main}
        style={{ display: address.isMain ? 'flex' : 'none' }}
      >
        <div className={style.address__main_text}>Main Address</div>
        <div className={style.address__main_mark} />
      </div>
    </div>
  );
};

export default Address;
