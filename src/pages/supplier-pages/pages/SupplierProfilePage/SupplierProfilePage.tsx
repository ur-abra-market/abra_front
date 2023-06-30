import React, { Suspense, useEffect } from 'react';

import { Await, Outlet, useLoaderData } from 'react-router-dom';

import { SupplierNotifications } from './SupplierNotifications/SupplierNotifications';
import style from './SupplierProfilePage.module.scss';

import { SupplierBusinessInfoChangeForm, SupplierPersonalInfoChangeForm } from '.';

import { useAppDispatch } from 'common/hooks';
import { AccountManagement } from 'elements';
import { getCountries } from 'store/reducers/commonSlice';
import { LoaderCircular, LoaderLinear } from 'ui-kit';

export const SupplierProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data } = useLoaderData() as { data: Promise<any> };

  console.log(data);

  // useEffect(() => {
  //   dispatch(getCountries());
  // }, []);

  return (
    <Suspense fallback={<LoaderLinear />}>
      <Await resolve={data}>
        <div className={style.supplier_cabinet}>
          <div className={style.supplier_cabinet_content_wrapper}>
            <SupplierPersonalInfoChangeForm />

            <div className={style.business_profile}>
              <SupplierBusinessInfoChangeForm />
            </div>

            <div className={style.account_details}>
              <AccountManagement />
            </div>

            <div className={style.notifications}>
              <SupplierNotifications />
            </div>
          </div>
        </div>
      </Await>
    </Suspense>
  );
};
