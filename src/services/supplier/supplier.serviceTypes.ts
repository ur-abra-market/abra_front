import { IPhoneNumber } from 'common/types';
import { ICountry } from 'services/common/common.serviceTypes';

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
  phone: {
    id: 1;
    phone_number: string;
    country: {
      id: number;
      country: string;
      country_code: string;
      country_short: string;
      currency: string;
      flag: string;
    };
  };
  images: string[];
}

export interface IBusinessInfoRequest
  extends Omit<ISupplierUpdateBusinessInfo, 'company_phone_data_request'> {
  file?: File;
  company_phone_data_request?: Partial<IPhoneNumber>;
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

export interface ISupplierUpdateBusinessInfo {
  supplier_data_request: {
    license_number: string;
  };
  company_data_request: {
    country_id: number;
    name: string;
    is_manufacturer: boolean;
    year_established: number;
    number_employees: number;
    description?: string;
    address?: string;
    business_sector: string;
    business_email?: string;
  };
  company_phone_data_request?: IPhoneNumber;
}
