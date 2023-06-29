import { Dispatch } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from 'common/types';

export const handleLoadingStatus = (
  type: string,
  actionType: string,
  actionTypesToHandle: string[],
  requestStatus: 'pending' | 'fulfilled' | 'rejected' | undefined,
  dispatch: Dispatch,
): void => {
  if (actionTypesToHandle.some(actionType => type.startsWith(actionType))) {
    if (requestStatus === 'pending') {
      dispatch({
        type: actionType,
        payload: LoadingStatusEnum.Loading,
      });
    }

    if (requestStatus === 'fulfilled' && type.includes('get')) {
      dispatch({
        type: actionType,
        payload: LoadingStatusEnum.Success,
      });
    }

    if (requestStatus === 'rejected') {
      dispatch({
        type: actionType,
        payload: LoadingStatusEnum.Failed,
      });
    }
  }
};
