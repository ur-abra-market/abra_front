import httpService from './http.service';

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/get_supplier_info/`);

    return data.result;
  },
  sendAccountData: async (personalData: RequestAccountInfo) => {
    const { data } = await httpService.patch(
      `suppliers/send_account_info/`,
      personalData,
    );

    return data;
  },
  getNotifications: async () => {
    const { data } = await httpService.get(`users/get_notifications/`);

    return data;
  },
  postNotifications: async (notifications: INotification) => {
    const { data } = await httpService.patch(`users/update_notification/`, notifications);

    return data.result;
  },
};

export default supplierAccountData;

export interface UserInfo {
  first_name: string;
  last_name: string;
  phone: string;
  license: number;
}

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

export interface Country {
  country: string;
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
