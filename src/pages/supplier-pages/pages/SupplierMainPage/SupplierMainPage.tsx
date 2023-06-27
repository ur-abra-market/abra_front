import React from 'react';

import { Outlet } from 'react-router-dom';

import { WithLayout } from 'common/hocs/WithLayout';

export const SupplierMainPage = WithLayout((): JSX.Element => {
  // useEffect(() => {
  //   if (!hasProfile) navigate('../account-setup');
  // }, [hasProfile]);

  // if (isLoading === LoadingStatusEnum.Loading) {
  //   return <LoaderCircular />;
  // }

  return <Outlet />;
}, 'supplier');
