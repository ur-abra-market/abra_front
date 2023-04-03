import React, { FC, useState } from 'react';

import { ReactComponent as Edit } from '../../assets/img/icons/edit.svg';
import { ISellerAddressData } from '../../services/seller.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSelected } from '../../store/reducers/sellerCheckoutSlice';
import Check from '../Check';
import { EditAddressModal } from '../ui/popup/EdtiAddressModal/EditAddressModal';

import style from './Address.module.css';

interface AddressProps {
  address: ISellerAddressData;
  id: number;
}
const Address: FC<AddressProps> = ({ address, id }): JSX.Element => {
  const { first_name, last_name, phone } = useAppSelector(
    state => state.seller.userProfileInfo,
  );
  const { selected } = useAppSelector(state => state.sellerCheckout);
  const dispatch = useAppDispatch();
  const styles = {
    border: selected ? '1px solid #FC133D' : '1px solid #D4D4D4',
  };
  const id_address = String(id);
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
  const ocClickMain = (): void => {
    dispatch(changeSelected({ selected: true }));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.address} style={styles} onClick={ocClickMain} id={id_address}>
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
          display: selected ? 'flex' : 'none',
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
