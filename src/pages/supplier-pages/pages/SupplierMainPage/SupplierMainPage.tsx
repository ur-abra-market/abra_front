import React, { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import {
  hasCompanyInfoSelector,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile/selectors';
import { hasCompanyInfo, hasPersonalInfo } from 'store/reducers/supplier/profile/thunks';
import { LoaderCircular } from 'ui-kit';

export const SupplierMainPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(hasPersonalInfo());
      await dispatch(hasCompanyInfo());
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <LoaderCircular />;
  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
