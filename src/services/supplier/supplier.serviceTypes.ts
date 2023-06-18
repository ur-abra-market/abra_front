import { ICountry } from '../common/common.serviceTypes';

export interface License {
  license_number: number;
}

export interface CompanyInfo {
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

export interface RequestAccountInfo {
  user_info: {
    first_name: string;
    last_name?: string;
    user_phone?: string;
  };
  license: License;
  company_info: {
    name: string;
    business_sector: string;
    is_manufacturer: number;
    year_established?: number;
    number_of_employees?: number;
    description?: string;
    phone?: string;
    business_email?: string;
    address?: string;
  };
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

export interface ISuppliersCompanyInfoData {
  id: number;
  license_number: string;
  grade_average: number;
  additional_info: string;
  company: ICompanyInfo;
}

export interface ICompanyInfo {
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
  country: ICountry;
}

export interface ISuppliersUpdateCompanyInfo {
  supplier_data_request: ISupplierLicense;
  company_data_request: Omit<IUpdateCompanyInfo, 'id' | 'country' | 'phone' | 'images'>;
  company_phone_data_request: ISuppliersCompanyPhoneData;
}

interface ISupplierLicense {
  license_number: string;
}

interface IUpdateCompanyInfo extends ICompanyInfo {
  country_id: number;
}

interface ISuppliersCompanyPhoneData {
  country_id: number;
  phone_number: string;
}
