import { LoadingStatusEnum } from 'common/types';

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

export interface ILoading {
  personalInfoLoading: LoadingStatusEnum;
}

export interface IUserSliceInitialState {
  loading: ILoading;
  personalInfo: IUserPersonalInfo;
  favoritesProducts: any[];
}
