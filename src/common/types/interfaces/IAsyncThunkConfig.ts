import { AppDispatchType, RootStateType } from 'store/createStore';

export interface IAsyncThunkConfig {
  state: RootStateType;
  dispatch: AppDispatchType;
  extra?: unknown;
  rejectValue: string | boolean;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}
