import React, { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ErrorPage } from 'pages/general-pages';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import { getCompanyNumberEmployees } from 'store/reducers/commonSlice';
import {
  hasBusinessInfo,
  hasCompanyInfoErrorSelector,
  hasCompanyInfoSelector,
  hasPersonalInfo,
  hasPersonalInfoErrorSelector,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile';
import { LoaderLinear } from 'ui-kit';

export const SupplierMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);
  const hasPersonalInfoError = useAppSelector(hasPersonalInfoErrorSelector);
  const hasCompanyInfoError = useAppSelector(hasCompanyInfoErrorSelector);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      await dispatch(hasPersonalInfo());

      await dispatch(hasBusinessInfo());

      await dispatch(getCompanyNumberEmployees());
      setIsFetching(false);
    };

    fetch();
  }, [dispatch]);

  if (isFetching) return <LoaderLinear />;
  if (hasPersonalInfoError || hasCompanyInfoError) return <ErrorPage />;

  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
