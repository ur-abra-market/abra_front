import React, { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { LoadingStatus } from '../../../common/types/enums/status.enum';
import { Loader } from '../../../ui-kit';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

export const SupplierPage = (): JSX.Element => {
  const isLoading = useAppSelector(state => state.supplierAccount.isLoading);
  const hasProfile = useAppSelector(state => state.supplierAccount.hasProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasProfile) navigate('../account-setup');
  }, [hasProfile]);

  if (isLoading === LoadingStatus.Loading) {
    return <Loader />;
  }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};
