import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { AppDispatchType, RootStateType } from '../../store/createStore';

export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryId: number;
}

export interface AsyncThunkConfig {
  state: RootStateType;
  dispatch: AppDispatchType;
  extra?: unknown;
  rejectValue: string;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}

export interface IServerResponse<R> {
  ok: boolean;
  result: R;
}

export interface IHtmlHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
