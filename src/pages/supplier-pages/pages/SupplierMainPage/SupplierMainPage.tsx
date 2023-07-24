import React, { useLayoutEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import {
  hasCompanyInfoSelector,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile';
import { getData } from 'store/reducers/supplier/profile/thunks';
import { LoaderCircular } from 'ui-kit';

export const SupplierMainPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);
  const initializedLoading = useAppSelector(
    state => state.supplierProfile.initDataLoading,
  );
  const data = useAppSelector(state => state.supplierProfile.data);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!data) {
      dispatch(getData());
    }
  }, []);

  if (initializedLoading === LoadingStatusEnum.Loading) return <LoaderCircular />;
  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
