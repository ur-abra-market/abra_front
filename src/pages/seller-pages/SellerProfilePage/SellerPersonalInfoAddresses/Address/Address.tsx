import { FC, useState } from 'react';

import { EditPencilIcon } from 'assets/icons';
import Check from 'old-components/Check';
import { EditAddressModal } from 'old-components/ui/popup/EdtiAddressModal/EditAddressModal';
import style from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoAddresses/Address/Address.module.scss';
import { IAddress } from 'store/reducers/seller/profile/slice';

interface AddressProps {
  address: IAddress;
}

export const Address: FC<AddressProps> = ({ address }): JSX.Element => {
  const [selected] = useState(false);
  const styles = {
    border: selected ? '1px solid #FC133D' : '1px solid #D4D4D4',
  };
  const arrAddress = [
    address.postal_code,
    address.city,
    address.street,
    address.country.country,
    address.area,
    address.apartment,
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
          {address.first_name} {address.last_name},{address.phone_number}
          {address.building}
        </div>
        <EditPencilIcon className={style.address_content_edit} onClick={onClickModal} />
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

      <EditAddressModal modal={modal} setModal={setModal} dataArr={address} />
    </div>
  );
};
