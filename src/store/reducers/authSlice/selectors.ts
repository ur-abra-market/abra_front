import { UserRoleType } from '../../../common/types';
import { RootStateType } from '../../createStore';

export const userRoleSelector = (state: RootStateType): UserRoleType =>
  state.auth.userRole;
export const isAuthSelector = (state: RootStateType): boolean => state.auth.isAuthorized;
