import { MakeFieldsOptionalType } from 'common/types';
import { ICountry } from 'services/common/common.serviceTypes';

export interface ISupplierBusinessInfo {
  additional_info: string;
  company: ISupplierCompanyInfo;
  created_at: string;
  grade_average: number;
  id: number;
  license_number: string;
  updated_at: string;
}

export interface ISupplierCompanyInfo {
  address: string;
  business_email: string;
  business_sector: string;
  country: ICountry;
  created_at?: string;
  description: string;
  employees_number_id: number;
  id: number;
  images: any[];
  is_manufacturer: boolean;
  name: string;
  phone: Partial<ISupplierPhoneInfo>;
  updated_at?: string;
  year_established: number;
}

interface IBusinessSector {
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  level?: number;
}

export interface IBusinessInfoRequest
  extends Omit<ISupplierUpdateBusinessInfo, 'company_phone_data_request'> {
  file?: File;
  company_phone_data_request?: ISuppliersCompanyPhoneData;
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
  country: ICountry;
}

export interface ISupplierUpdateBusinessInfo {
  supplier_data_request: { license_number: string };
  company_data_request: MakeFieldsOptionalType<
    ISupplierUpdateCompanyInfo,
    'address' | 'business_email' | 'description'
  >;
  company_phone_data_request?: ISuppliersCompanyPhoneData;
}

export interface ISupplierUpdateCompanyInfo
  extends Omit<
    ISupplierCompanyInfo,
    'id' | 'country' | 'phone' | 'images' | 'business_sector'
  > {
  country_id: number;
  business_sector: number;
}

interface ISuppliersCompanyPhoneData {
  country_id: number;
  phone_number: string;
}
