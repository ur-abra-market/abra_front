import { CountriesEnum, LoadingStatusEnum } from 'common/types';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';

export interface ISupplierBusinessInfo {
  companyLogo: string;
  storeName: string;
  businessSector: string;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numberEmployees: number | null;
  countryRegistration: number | null;
  description: string;
  businessPhoneNumberBody: string;
  businessPhoneNumberCountryId: CountriesEnum | null;
  businessEmail: string;
  companyAddress: string;
}

export interface ITestSupplierBusinessInfo {
  storeName: string;
  businessSector: string;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numberEmployees: number | null;
  countryRegistration: number | null;
  description: string;
  businessPhoneNumberBody: string;
  businessPhoneNumberCountryId: number | null;
  businessEmail: string;
  companyAddress: string;
}

export interface ILoading {
  businessInfoLoading: LoadingStatusEnum;
  notificationsLoading: LoadingStatusEnum;
  companyLogoLoading: LoadingStatusEnum;
}

export interface ISupplierProfileSliceInitialState {
  loading: ILoading;
  hasCompanyInfo: boolean | null;
  hasPersonalInfo: boolean | null;
<<<<<<< Updated upstream
  initDataLoading: LoadingStatusEnum;
  data: boolean | null;
=======
  hasPersonalInfoError: boolean;
  hasCompanyInfoError: boolean;
  businessInfo: ISupplierBusinessInfo;
  notifications: ISupplierNotifications | null;
>>>>>>> Stashed changes
}
