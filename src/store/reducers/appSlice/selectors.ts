import { LoadingStatus } from '../../../common/types';
import { RootStateType } from '../../createStore';

import { IResponseNotice } from './slice';

export const isAppInitializedSelector = (state: RootStateType): boolean =>
  state.app.isAppInitialized;
export const responseNoticeSelector = (state: RootStateType): IResponseNotice =>
  state.app.responseNotice;
export const loadingSelector = (state: RootStateType): LoadingStatus => state.app.loading;
