import React from 'react';

import { NavLink } from 'react-router-dom';

import { SupplierPersonalInfoForm } from '.';

import { useAppSelector } from 'common/hooks';
import { HOME } from 'routes';
import {
  hasPersonalInfoErrorSelector,
  hasPersonalInfoSelector,
} from 'store/reducers/supplier/profile';
import { Button } from 'ui-kit/buttons/Button/Button';

export const AccountSetupPersonalInfoPage = (): JSX.Element => {
  // const hasPersonalInfoResult = useAppSelector(hasPersonalInfoSelector);
  //
  // if (hasPersonalInfoResult || hasPersonalInfoResult === null) {
  //   return <Navigate to={HOME} />;
  // }

  return <SupplierPersonalInfoForm />;
};
