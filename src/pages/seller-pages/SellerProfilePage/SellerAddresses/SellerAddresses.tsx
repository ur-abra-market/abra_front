import React, { useState } from 'react';

import { Address } from './Address/Address';
import { makeMainAddressFirst } from './helpers/makeMainAddressFirst';
import { SellerAddAddressChangeForm } from './SellerAddAddressChangeForm/SellerAddAddressChangeForm';
import style from './SellerAddresses.module.scss';

import { useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';
import { sellerAddressesSelector } from 'store/reducers/seller/profile/selectors';

export const SellerAddresses = (): JSX.Element => {
  const addresses = useAppSelector(sellerAddressesSelector);
  const [modal, setModal] = useState(false);

  const onClickAddAddressModal = (): void => {
    setModal(true);
  };

  const sortedAddresses: ISellerAddressData[] | undefined = makeMainAddressFirst(
    addresses!,
  );

  return (
    <>
      <div className={style.header_wrapper}>
        <div className={style.header}>My Addresses</div>
        <button
          type="button"
          className={style.header_link}
          onClick={onClickAddAddressModal}
        >
          Add new
        </button>
        <Modal showModal={modal} closeModal={setModal}>
          <SellerAddAddressChangeForm closeModal={setModal} />
        </Modal>
      </div>
      <div className={style.my_addresses_wrapper}>
        {addresses?.length ? (
          <div className={style.addresses_container}>
            {sortedAddresses?.map(address => (
              <Address key={address.id} address={address} />
            ))}
          </div>
        ) : (
          <div>
            <p className={style.no_address}>You have not added any address yet.</p>
            <p className={style.no_address}>
              Once you place your first order, you will be able to save your address.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
