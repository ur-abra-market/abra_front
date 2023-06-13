import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '../../../../common/hooks';
import { getCountries } from '../../../../store/reducers/commonSlice';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

export const SupplierMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!hasProfile) navigate('../account-setup');
  // }, [hasProfile]);

  // if (isLoading === LoadingStatus.Loading) {
  //   return <LoaderCircular />;
  // }

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};
