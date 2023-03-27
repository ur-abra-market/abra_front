import React, { FC, useState } from 'react';

import { ReactComponent as Edit } from '../../assets/img/icons/edit.svg';
import { AddAddressFormData } from '../../services/seller.service';
import Check from '../Check';
import { EditAddressModal } from '../ui/popup/EdtiAddressModal/EditAddressModal';

import style from './Address.module.css';

interface AddressProps {
  address: AddAddressFormData;
}
const Address: FC<AddressProps> = ({ address }): JSX.Element => {
  const [isMain] = useState(false);
  const styles = {
    border: isMain ? '1px solid #FC133D' : '1px solid #D4D4D4',
  };
  const arrAddress = [
    address.seller_data.last_name,
    address.seller_data.first_name,
    address.seller_address_data.city,
    address.seller_address_data.street,
    address.seller_address_data.country,
    address.seller_address_data.area,
    address.seller_address_data.appartment,
    address.seller_address_data.postal_code,
    address.seller_address_data.building,
  ];
  const arrFilter = arrAddress.filter(e => e !== '');
  const [modal, setModal] = useState(false);

  const onClickModal = (): void => {
    setModal(true);
  };

  return (
    <div className={style.address} style={styles}>
      <div className={style.address_content}>
        <div className={style.address_content_text}>
          {address.seller_data.first_name} {address.seller_data.last_name},{' '}
          {address.seller_address_data.building}
        </div>
        <Edit className={style.address_content_edit} onClick={onClickModal} />
      </div>
      <span className={style.address_content_line} />
      <div className={style.address_place}>{arrFilter.join(' ')}</div>
      <div
        className={style.address_main}
        style={{
          display: isMain ? 'flex' : 'none',
        }}
      >
        <div className={style.address_main_text}>Main Address</div>
        <Check />
      </div>
      <EditAddressModal modal={modal} setModal={setModal} data={address} />
    </div>
  );
};

export default Address;
