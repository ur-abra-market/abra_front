import { UserRoleType } from '../../../common/types';
import { RootStateType } from '../../createStore';

import { passwordActionsResultType } from './slice';

export const userRoleSelector = (state: RootStateType): UserRoleType =>
  state.auth.userRole;
export const isAuthorizedSelector = (state: RootStateType): boolean =>
  state.auth.isAuthorized;
export const passwordActionsResultSelector = (
  state: RootStateType,
): passwordActionsResultType => state.auth.passwordActionsResult;
