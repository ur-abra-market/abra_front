import React, { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

// import Loader from '../../components/Loader';
// import { Status } from '../../enums/status.enum';
import { useAppSelector } from '../../store/hooks';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

const SupplierPage = (): JSX.Element => {
  // const isLoading = useAppSelector(state => state.supplierAccount.isLoading);
  const hasProfile = useAppSelector(state => state.supplierAccount.hasProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasProfile) navigate('../account-setup');
  }, [hasProfile]);

  // if (isLoading === Status.Loading) {
  //   return <Loader />;
  // }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};

export default SupplierPage;
