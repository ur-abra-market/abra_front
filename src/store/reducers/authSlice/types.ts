import { UserRoleType } from 'common/types';

export interface IAuthSliceInitialState {
  userRole: UserRoleType;
  isAuthorized: boolean;
  isLogoutLoading: boolean;
}
