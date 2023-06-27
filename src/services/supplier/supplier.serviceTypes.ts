import { ICountry } from '../common/common.serviceTypes';

export interface ISupplierBusinessInfo {
  id: number;
  license_number: string;
  grade_average: number;
  additional_info: string;
  company: ISupplierCompanyInfo;
}

export interface ISupplierCompanyInfo {
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

export interface IBusinessInfoRequest
  extends Omit<ISupplierUpdateBusinessInfo, 'company_data_request'> {
  company_data_request: ISendISupplierCompanyInfo;
}

interface ISendISupplierCompanyInfo extends ISupplierUpdateCompanyInfo {
  logo_url: string;
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

interface ISupplierPhoneInfo {
  id: number;
  phone_number: string;
}

export interface ISupplierUpdateBusinessInfo {
  supplier_data_request: { license_number: string };
  company_data_request: ISupplierUpdateCompanyInfo;
  company_phone_data_request: ISuppliersCompanyPhoneData;
}

export interface ISupplierUpdateCompanyInfo
  extends Omit<ISupplierCompanyInfo, 'id' | 'country' | 'phone' | 'images'> {
  country_id: number;
}

interface ISuppliersCompanyPhoneData {
  country_id: number;
  phone_number: string;
}
