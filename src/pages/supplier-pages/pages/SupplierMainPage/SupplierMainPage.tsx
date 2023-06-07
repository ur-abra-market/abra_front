import React from 'react';

import { Outlet } from 'react-router-dom';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

export const SupplierMainPage = (): JSX.Element => {
  // const isLoading = useAppSelector(state => state.supplierAccount.isLoading);
  // const hasProfile = useAppSelector(state => state.supplierAccount.hasProfile);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!hasProfile) navigate('../account-setup');
  // }, [hasProfile]);

  // if (isLoading === LoadingStatus.Loading) {
  //   return <LoaderCircular />;
  // }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};
