import React, { useState } from 'react';

import style from './SellerAddresses.module.scss';

import { Address, makeMainAddressFirst, SellerAddAddressForm } from '.';

import { useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';
import { sellerAddressesSelector } from 'store/reducers/seller/profile/selectors';
import { Title } from 'ui-kit';

export const SellerAddresses = (): JSX.Element => {
  const addresses = useAppSelector(sellerAddressesSelector);
  const [isModalOpen, setModalOpen] = useState(false);

  const sortedAddresses: ISellerAddressData[] | undefined = makeMainAddressFirst(
    addresses!,
  );

  return (
    <>
      <div className={style.header_wrapper}>
        <Title as="h2" size="xs">
          My Addresses
        </Title>
        <button
          type="button"
          className={style.header_link}
          onClick={() => setModalOpen(true)}
        >
          Add new
        </button>

        <Modal showModal={isModalOpen} closeModal={setModalOpen}>
          <SellerAddAddressForm closeModal={setModalOpen} />
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
