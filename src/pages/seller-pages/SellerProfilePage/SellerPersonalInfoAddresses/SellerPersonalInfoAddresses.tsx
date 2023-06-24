import React from 'react';

import { Link } from 'react-router-dom';

import style from './SellerPersonalInfoAddresses.module.scss';

import { useAppSelector } from 'common/hooks';
import { Address } from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoAddresses/Address/Address';
import { IAddress } from 'store/reducers/seller/profile/slice';

export const SellerPersonalInfoAddresses = (): JSX.Element => {
  const addresses = useAppSelector(state => state.sellerProfile.addresses);

  return (
    <>
      <div className={style.header_wrapper}>
        <div className={style.header}>My Addresses</div>
        <Link className={style.header_link} to="/">
          Add new
        </Link>
      </div>
      <div className={style.my_addresses_wrapper}>
        {addresses ? (
          <div className={style.addresses_container}>
            {addresses.map((a: IAddress) => (
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
