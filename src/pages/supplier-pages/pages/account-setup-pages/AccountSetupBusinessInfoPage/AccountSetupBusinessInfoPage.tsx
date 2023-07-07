import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AccountSetupBusinessInfoForm } from '.';

import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { getCompanyNumberEmployees } from 'store/reducers/commonSlice';
import { hasCompanyInfo } from 'store/reducers/supplier/profile/thunks';
import { LoaderCircular } from 'ui-kit';

export const AccountSetupBusinessInfoPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCompanyNumberEmployees());
    dispatch(hasCompanyInfo())
      .then(res => {
        if (res.payload) navigate(HOME);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoaderCircular />;

  return <AccountSetupBusinessInfoForm />;
};
