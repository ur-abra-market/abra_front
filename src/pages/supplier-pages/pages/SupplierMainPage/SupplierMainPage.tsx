import React, { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ACCOUNT_SETUP_BUSINESS_INFO, ACCOUNT_SETUP_PERSONAL_INFO } from 'routes';
import { getCompanyNumberEmployees } from 'store/reducers/commonSlice';
import {
  hasBusinessInfo,
  hasCompanyInfoSelector,
  hasPersonalInfo,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile';
import { LoaderCircular } from 'ui-kit';

export const SupplierMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);

  useEffect(() => {
    if (hasPersonalInfoResult) return;
    const fetch = async (): Promise<void> => {
      await dispatch(hasPersonalInfo());

      await dispatch(hasBusinessInfo());

      await dispatch(getCompanyNumberEmployees());
      setIsFetching(false);
    };

    fetch();
  }, [dispatch, hasPersonalInfoResult]);

  if (isFetching && !hasCompanyInfoResult) return <LoaderCircular />;
  if (!hasPersonalInfoResult) return <Navigate to={ACCOUNT_SETUP_PERSONAL_INFO} />;
  if (!hasCompanyInfoResult) return <Navigate to={ACCOUNT_SETUP_BUSINESS_INFO} />;

  return <Outlet />;
};
