import { ICountry } from '../common/common.serviceTypes';

// export interface License {
//   license_number: number;
// }
//
// export interface IAccountInfoRequest {
//   user_info: {
//     first_name: string;
//     last_name?: string;
//     user_phone?: string;
//   };
//   license: License;
//   company_info: {
//     name: string;
//     business_sector: string;
//     is_manufacturer: number;
//     year_established?: number;
//     number_of_employees?: number;
//     description?: string;
//     phone?: string;
//     business_email?: string;
//     address?: string;
//   };
// }

export interface ICompanyInfo {
  name: string;
  business_sector: string;
  is_manufacturer: number;
  year_established: number;
  number_of_employees: number;
  description: string;
  phone: string;
  business_email: string;
  address: string;
}

export interface ISupplierNotifications {
  on_advertising_campaigns: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_product_updates: boolean;
  on_product_reminders: boolean;
  on_reviews_of_products: boolean;
  on_change_in_demand: boolean;
  on_advice_from_abra: boolean;
  on_account_support: boolean;
}

export interface ISuppliersResponse<R> {
  ok: boolean;
  result: R;
}

export interface ISupplierErrorResponse {
  ok: boolean;
  error_code: number;
  error: { loc: string[]; msg: string; type: string }[];
}

export interface ISuppliersICompanyInfoData {
  id: number;
  license_number: string;
  grade_average: number;
  additional_info: string;
  company: ISuppliersCompanyInfo;
}

export interface ISuppliersCompanyInfo {
  id: number;
  business_email: string;
  name: string;
  is_manufacturer: boolean;
  year_established: number;
  number_employees: number;
  description: string;
  address: string;
  business_sector: string;
  country: ICountry;
  phone: IPhoneInfo;
  images: any[];
}

interface IPhoneInfo {
  id: number;
  phone_number: string;
}

export interface ISuppliersUpdateICompanyInfo {
  supplier_data_request: ISupplierLicense;
  company_data_request: IUpdateICompanyInfo;
  company_phone_data_request: ISuppliersCompanyPhoneData;
}

interface ISupplierLicense {
  license_number: string;
}

export interface IUpdateICompanyInfo
  extends Omit<ISuppliersCompanyInfo, 'id' | 'country' | 'phone' | 'images'> {
  country_id: number;
}

interface ISuppliersCompanyPhoneData {
  country_id: number;
  phone_number: string;
}
