import { ILoading, IUserPersonalInfo } from './slice';

import { RootStateType } from 'store/createStore';

export const userPersonalInfoSelector = (state: RootStateType): IUserPersonalInfo =>
  state.user.personalInfo;

export const userLoadingSelector = (state: RootStateType): ILoading => state.user.loading;
