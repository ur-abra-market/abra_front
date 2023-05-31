import { UserRoleType } from '../../../common/types';
import { RootStateType } from '../../createStore';

export const errorMessageSelector = (state: RootStateType): string | null =>
  state.auth.errorMessage;

export const userRoleSelector = (state: RootStateType): UserRoleType =>
  state.auth.userRole;
