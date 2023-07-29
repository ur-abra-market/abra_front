import React, { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import { isAuthSelector } from 'store/reducers/authSlice';
import { getCompanyNumberEmployees } from 'store/reducers/commonSlice';
import {
  hasBusinessInfo,
  hasCompanyInfoSelector,
  hasPersonalInfo,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile';
import { LoaderCircular, LoaderLinear } from 'ui-kit';

export const SupplierMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const [isFetching, setIsFetching] = useState(true);
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);

  console.log(isAuth);

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
  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
