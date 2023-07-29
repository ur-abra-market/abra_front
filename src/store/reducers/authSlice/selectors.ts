import { UserRoleType } from 'common/types';
import { RootStateType } from 'store/createStore';

export const userRoleSelector = (state: RootStateType): UserRoleType =>
  state.auth.userRole;
export const isAuthSelector = (state: RootStateType): boolean => state.auth.isAuthorized;

export const isLogoutLoadingSelector = (state: RootStateType): boolean =>
  state.auth.isLogoutLoading;
