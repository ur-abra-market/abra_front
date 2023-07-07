import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SupplierPersonalInfoForm } from '.';

import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { hasPersonalInfo } from 'store/reducers/supplier/profile/thunks';
import { LoaderCircular } from 'ui-kit';

export const AccountSetupPersonalInfoPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(hasPersonalInfo())
      .then(res => {
        if (res.payload) navigate(HOME);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoaderCircular />;

  return <SupplierPersonalInfoForm />;
};
