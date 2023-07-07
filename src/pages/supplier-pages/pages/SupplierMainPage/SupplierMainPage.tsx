import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import {
  hasCompanyInfoSelector,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile/selectors';

export const SupplierMainPage = (): JSX.Element => {
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);

  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
