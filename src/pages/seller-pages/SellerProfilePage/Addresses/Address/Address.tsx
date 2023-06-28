import { FC, useState } from 'react';

import cn from 'classnames';

import style from './Address.module.scss';

import { EditPencilIcon } from 'assets/icons';
import Modal from 'elements/Modal';
import SellerEditAddressChangeForm from 'pages/seller-pages/SellerProfilePage/Addresses/SellerEditAddressChangeForm/SellerEditAddressChangeForm';
import { IAddress } from 'store/reducers/seller/profile/slice';

interface AddressProps {
  address: IAddress;
}

export const Address: FC<AddressProps> = ({ address }): JSX.Element => {
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
  const arrFilter = arrAddress.filter(e => e !== '').join(', ');
  const [modal, setModal] = useState(false);

  const onClickModal = (): void => {
    setModal(true);
  };

  return (
    <div className={cn(style.address, { [style.address_main]: isMain })}>
      <div className={style.address_content}>
        <div className={style.address_personal_info}>
          {address.first_name} {address.last_name}, {address.phone_number}
        </div>
        <EditPencilIcon className={style.address_edit} onClick={onClickModal} />
      </div>
      <div className={style.address_location_info}>{arrFilter}</div>
      {isMain && <div className={style.address_main_text}>Main Address</div>}
      <Modal showModal={modal} closeModal={setModal}>
        <SellerEditAddressChangeForm address={address} />
      </Modal>
    </div>
  );
};
