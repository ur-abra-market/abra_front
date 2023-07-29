import React from 'react';

import { Navigate } from 'react-router-dom';

import { AccountSetupBusinessInfoForm } from '.';

import { useAppSelector } from 'common/hooks';
import { HOME } from 'routes';
import { hasCompanyInfoSelector } from 'store/reducers/supplier/profile';

export const AccountSetupBusinessInfoPage = (): JSX.Element => {
  const hasCompanyInfoResult = useAppSelector(hasCompanyInfoSelector);

  // if (hasCompanyInfoResult || hasCompanyInfoResult === null) {
  //   return <Navigate to={HOME} />;
  // }

  return <AccountSetupBusinessInfoForm />;
};
