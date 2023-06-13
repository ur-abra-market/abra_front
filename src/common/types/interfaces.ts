import { AppDispatchType, RootStateType } from '../../store/createStore';

export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryId: number | null;
}

export interface IPersonalInfoRequestData {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
} // todo разобраться с валидацией запросов

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
