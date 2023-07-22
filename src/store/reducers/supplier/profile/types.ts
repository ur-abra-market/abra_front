import { LoadingStatusEnum } from 'common/types';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';

export interface ISupplierBusinessInfo {
  storeName: string;
  businessSector: string;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numEmployees: number | null;
  countryRegistration: number | null;
  description: string;
  email: string;
  phoneNumber?: string;
  phoneId?: number | null;
  countryShort?: string;
  countryCode?: string;
  address: string;
  companyLogo: string;
  countryId?: number | null;
}

export interface ILoading {
  businessInfoLoading: LoadingStatusEnum;
  notificationsLoading: LoadingStatusEnum;
  companyLogoLoading: LoadingStatusEnum;
}

export interface ISupplierProfileSliceInitialState {
  loading: ILoading;
  businessInfo: ISupplierBusinessInfo;
  notifications: ISupplierNotifications | null;
  hasCompanyInfo: boolean | null;
  hasPersonalInfo: boolean | null;
}
