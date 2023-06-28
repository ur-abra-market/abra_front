import React, { useEffect, useState } from 'react';

import { Address } from './Address/Address';
import { SellerAddAddressChangeForm } from './SellerAddAddressChangeForm/SellerAddAddressChangeForm';
import style from './SellerAddresses.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { IAddress } from 'store/reducers/seller/profile/slice';
import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

export const SellerAddresses = (): JSX.Element => {
  const [modal, setModal] = useState(false);

  const onClickAddAddressModal = (): void => {
    setModal(true);
  };

  const addresses = useAppSelector(state => state.sellerProfile.addresses);
  // todo вынести в функцию
  const sortedAddresses: IAddress[] | undefined = addresses?.reduce(
    (acc: IAddress[], item: IAddress) => {
      if (item.is_main) {
        acc.unshift(item);
      } else {
        acc.push(item);
      }

      return acc;
    },
    [],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerAddresses());
  }, []);

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
        {sortedAddresses ? (
          <div className={style.addresses_container}>
            {sortedAddresses.map((a: IAddress) => (
              <Address key={a.id} address={a} />
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
