import React from 'react';

import { Navigate } from 'react-router-dom';

import { SupplierPersonalInfoForm } from '.';

import { useAppSelector } from 'common/hooks';
import { HOME } from 'routes';
import { hasPersonalInfoSelector } from 'store/reducers/supplier/profile/selectors';

export const AccountSetupPersonalInfoPage = (): JSX.Element => {
  const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);

  if (hasPersonalInfoResult) return <Navigate to={HOME} />;

  return <SupplierPersonalInfoForm />;
};
