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

export interface ISupplierCompanyInfo {
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

export interface ISupplierErrorResponse {
  ok: boolean;
  error_code: number;
  error: { loc: string[]; msg: string; type: string }[];
}

export interface ISupplierCompanyInfoData {
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
  phone: ISupplierPhoneInfo;
  images: any[];
}

interface ISupplierPhoneInfo {
  id: number;
  phone_number: string;
}

export interface ISuppliersUpdateISupplierCompanyInfo {
  supplier_data_request: ISupplierLicense;
  company_data_request: ISupplierUpdateCompanyInfo;
  company_phone_data_request: ISuppliersCompanyPhoneData;
}

interface ISupplierLicense {
  license_number: string;
}

export interface ISupplierUpdateCompanyInfo
  extends Omit<ISuppliersCompanyInfo, 'id' | 'country' | 'phone' | 'images'> {
  country_id: number;
}

interface ISuppliersCompanyPhoneData {
  country_id: number;
  phone_number: string;
}
