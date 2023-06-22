import React from 'react';

import { Outlet } from 'react-router-dom';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

export const SupplierMainPage = (): JSX.Element => {
  // useEffect(() => {
  //   if (!hasProfile) navigate('../account-setup');
  // }, [hasProfile]);

  // if (isLoading === LoadingStatusEnum.Loading) {
  //   return <LoaderCircular />;
  // }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};
