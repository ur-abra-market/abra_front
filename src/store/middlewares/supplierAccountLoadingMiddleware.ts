import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import {
  SUPPLIER_ACCOUNT_SET_LOADING_STATUS,
  SUPPLIER_ACCOUNT_SET_PROGRESSING_STATUS,
} from 'common/constants';
import {
  FormActionSupplierProfileType,
  ProgressingActionSupplierProfileType,
} from 'common/types';
import { handleLoadingStatus } from 'common/utils/handleLoadingStatus';

const formActionTypesToHandle: FormActionSupplierProfileType[] = [
  'user/getPersonalInfo',
  'user/updatePersonalInfo',
  'supplierProfile/getBusinessInfo',
  'supplierProfile/updateBusinessInfo',
  'supplierAccount/getSupplierNotifications',
  'supplierAccount/updateSupplierNotifications',
];

const progressingActionTypesToHandle: ProgressingActionSupplierProfileType[] = [
  'user/getPersonalInfo',
  'user/updatePersonalInfo',
  'supplierProfile/getBusinessInfo',
  'supplierProfile/updateBusinessInfo',
  'supplierProfile/getCompanyLogo',
  'supplierProfile/uploadCompanyLogo',
];

export const supplierAccountLoadingMiddleware: Middleware =
  (api: MiddlewareAPI) => next => action => {
    const { type, meta } = action;

    handleLoadingStatus(
      type,
      SUPPLIER_ACCOUNT_SET_LOADING_STATUS,
      formActionTypesToHandle,
      meta?.requestStatus,
      api.dispatch,
    );

    handleLoadingStatus(
      type,
      SUPPLIER_ACCOUNT_SET_PROGRESSING_STATUS,
      progressingActionTypesToHandle,
      meta?.requestStatus,
      api.dispatch,
    );

    return next(action);
  };
