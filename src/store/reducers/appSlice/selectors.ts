import { RootStateType } from '../../createStore';

export const isAppInitializedSelector = (state: RootStateType): boolean =>
  state.app.isAppInitialized;
