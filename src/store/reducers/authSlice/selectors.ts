import { RootStateType } from '../../createStore';

export const errorMessageSelector = (state: RootStateType): string | null =>
  state.auth.errorMessage;
