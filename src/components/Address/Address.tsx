import React, { FC, useState } from 'react';

import { ReactComponent as Edit } from '../../assets/img/icons/edit.svg';
import { ISellerAddressData } from '../../services/seller.service';
import { useAppSelector } from '../../store/hooks';
import Check from '../Check';
import { EditAddressModal } from '../ui/popup/EdtiAddressModal/EditAddressModal';

import style from './Address.module.css';

interface AddressProps {
  address: ISellerAddressData;
}
const Address: FC<AddressProps> = ({ address }): JSX.Element => {
  const { first_name, last_name, phone } = useAppSelector(
    state => state.seller.userProfileInfo,
  );
  const [isMain] = useState(false);
  const styles = {
    border: isMain ? '1px solid #FC133D' : '1px solid #D4D4D4',
  };
  const arrAddress = [
    address.postal_code,
    address.city,
    address.street,
    address.country,
    address.area,
    address.appartment,
    address.postal_code,
    address.building,
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
          {first_name} {last_name},{phone}
          {address.building}
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
