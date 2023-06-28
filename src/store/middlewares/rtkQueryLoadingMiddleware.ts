import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { handleLoadingStatus } from 'common/utils/handleLoadingStatus';

export const rtkQueryLoadingMiddleware: Middleware =
  (api: MiddlewareAPI) => next => action => {
    const { type, meta } = action;

    const actionTypesToHandle: string[] = ['user', 'supplierProfile', 'supplierAccount']; // Массив типов действий

    handleLoadingStatus(type, meta?.requestStatus, actionTypesToHandle, api.dispatch);

    return next(action);
  };
