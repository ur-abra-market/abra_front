import { RootStateType } from '../../createStore';

import { IPersonalInfo } from './slice';

export const personalInfoSelector = (state: RootStateType): IPersonalInfo =>
  state.user.personalInfo;
