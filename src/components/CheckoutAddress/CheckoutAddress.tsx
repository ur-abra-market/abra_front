import React, { FC } from 'react';

import cn from 'classnames';

import { ReactComponent as Edit } from '../../assets/img/icons/edit.svg';
import { SellerAddressData } from '../../services/seller.service';
import { EditAddressModal } from '../ui/popup/EdtiAddressModal/EditAddressModal';
import { Checkbox } from '../ui-kit';

import style from './CheckoutAddress.module.css';

interface AddressProps {
  address: SellerAddressData;
  onClick: () => void;
  selected: boolean;
  openModal: () => void;
  modal: boolean;
}
const CheckoutAddress: FC<AddressProps> = ({
  address,
  onClick,
  openModal,
  selected,
  modal,
}): JSX.Element => {
  const {
    apartment,
    first_name,
    last_name,
    phone_number,
    country,
    building,
    city,
    street,
    area,
    postal_code,
  } = address;

  return (
    <div
      role="presentation"
      className={cn(style.address, {
        [style.selected]: selected,
      })}
      onClick={onClick}
    >
      <div className={style.address_content}>
        <div className={style.address_content_text}>
          {first_name} {last_name},{phone_number}
          {address.building}
        </div>
        <Edit className={style.address_content_edit} onClick={openModal} />
      </div>
      <span className={style.address_content_line} />
      <span className={style.address_place}>
        {apartment},{building},{country},{city},{street},{area},{postal_code}
      </span>

      <div
        className={style.address_main}
        style={{
          display: selected ? 'flex' : 'none',
        }}
      >
        <EditAddressModal modal={modal} setModal={openModal} dataArr={address} />
        <div className={style.address_main_text}>Main Address</div>
        <Checkbox variant="default" checked={selected} readOnly />
      </div>
    </div>
  );
};

export default CheckoutAddress;
