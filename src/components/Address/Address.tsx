import React, { FC } from 'react';

import { ReactComponent as Edit } from '../../assets/img/icons/edit.svg';
import Check from '../Check';

import style from './Address.module.css';

interface AddressProps {
  address: any;
}
const Address: FC<AddressProps> = ({ address }): JSX.Element => {
  const styles = {
    border: address.isMain ? '1px solid #FC133D' : '1px solid #D4D4D4',
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
      <div className={style.address_content}>
        <div className={style.address_content_text}>
          {address.firstname} {address.lastname}, {address.phone}
        </div>
        <Edit className={style.address_content_edit} />
      </div>
      <span className={style.address_content_line} />
      <div className={style.address_place}>{arrFilter.join(' ')}</div>
      <div
        className={style.address_main}
        style={{
          display: address.isMain ? 'flex' : 'none',
        }}
      >
        <div className={style.address_main_text}>Main Address</div>
        <Check />
      </div>
    </div>
  );
};

export default Address;
