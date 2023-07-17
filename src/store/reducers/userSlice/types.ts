import { LoadingStatusEnum } from 'common/types';

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumberBody: string;
  phoneNumberCountryId: number | null;
}

export interface IUserSliceInitialState {
  loading: LoadingStatusEnum;
  personalInfo: IUserPersonalInfo;
  favoritesProducts: any[];
}
