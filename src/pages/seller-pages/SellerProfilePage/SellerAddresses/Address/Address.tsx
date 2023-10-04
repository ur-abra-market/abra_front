import { FC, useState } from 'react';

import cn from 'classnames';

import { SellerEditAddressForm } from '.';

import { EditPencilIcon } from 'assets/icons';
import Modal from 'elements/Modal';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';

import style from './Address.module.scss';

interface IAddress {
  address: ISellerAddressData;
}

export const Address: FC<IAddress> = ({ address }): JSX.Element => {
  const isMain = address.is_main;

  const arrAddress = [
    address.street,
    address.building,
    address.apartment,
    address.area,
    address.city,
    address.country.country,
    address.postal_code,
  ];
  const arrFilter = arrAddress.filter(e => e !== undefined).join(', ');
  const [modal, setModal] = useState(false);

  return (
    <div className={cn(style.address, { [style.address_main]: isMain })}>
      <div className={style.address_content}>
        <div className={style.address_personal_info}>
          {address.first_name} {address.last_name}, +{address.phone.country.country_code}
          {address.phone.phone_number}
        </div>
        <EditPencilIcon className={style.address_edit} onClick={() => setModal(true)} />
      </div>

      <div className={style.address_location_info}>{arrFilter}</div>
      {isMain && <div className={style.address_main_text}>Main Address</div>}

      <Modal showModal={modal} closeModal={setModal}>
        <SellerEditAddressForm address={address} closeModal={setModal} />
      </Modal>
    </div>
  );
};
