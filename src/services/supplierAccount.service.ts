import httpService from './http.service';

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/getSupplierInfo/`);

    return data.result;
  },
  sendAccountData: async (personalData: any) => {
    const { data } = await httpService.post(`suppliers/sendAccountInfo/`, personalData);

    return data;
  },
  postNotifications: async (notifications: INotification) => {
    const { data } = await httpService.patch(`users/updateNotification/`, notifications);

    return data.result;
  },
};

export default supplierAccountData;

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

export interface INotification {
  on_discount: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_stock_again: boolean;
  on_product_is_cheaper: boolean;
  on_your_favorites_new: boolean;
  on_account_support: boolean;
}

export interface ISupplierNotification {
  id: number;
  on_advertising_campaigns: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_product_updates: boolean;
  on_product_reminders: boolean;
  on_reviews_of_products: boolean;
  on_change_in_demand: boolean;
  on_advice_from_abra: boolean;
  on_account_support: boolean;
  supplier: string;
}
