import { Dispatch } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from 'common/types';
import { setLoadingStatus } from 'store/reducers/supplier/profile/slice';

export const handleLoadingStatus = (
  type: string,
  requestStatus: 'pending' | 'fulfilled' | 'rejected' | undefined,
  actionTypesToHandle: string[],
  dispatch: Dispatch,
): void => {
  if (actionTypesToHandle.some(actionType => type.startsWith(actionType))) {
    switch (requestStatus) {
      case 'pending':
        dispatch(setLoadingStatus(LoadingStatusEnum.Loading));
        break;
      case 'fulfilled':
        dispatch(setLoadingStatus(LoadingStatusEnum.Success));
        break;
      case 'rejected':
        dispatch(setLoadingStatus(LoadingStatusEnum.Failed));
        break;
      default:
        break;
    }
  }
};
