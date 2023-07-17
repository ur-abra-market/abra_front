import { IUserPersonalInfo } from '.';

import { RootStateType } from 'store/createStore';
import { LoadingStatusEnum } from '../../../common/types';

export const userPersonalInfoSelector = (state: RootStateType): IUserPersonalInfo =>
  state.user.personalInfo;

export const userLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.user.loading;
