import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/get_supplier_info/`, {
      // @ts-ignore
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
  postAccountData: async (personalData: RequestAccountInfo) => {
    const { data } = await httpService.post(
      `suppliers/send_account_info/`,
      personalData,
      {
        // @ts-ignore
        headers: { 'X-CSRF-TOKEN': access },
      },
    );

    return data;
  },
  getNotifications: async () => {
    const { data } = await httpService.get(`users/get_notifications/`, {
      // @ts-ignore
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data;
  },
  postNotifications: async (notifications: INotification) => {
    const { data } = await httpService.post(`users/update_notification/`, notifications, {
      // @ts-ignore
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
};

export default supplierAccountData;

export interface UserInfo {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface License {
  license_number: number;
}

export interface CompanyInfo {
  logo_url: string;
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
  user_info: UserInfo;
  license: License;
  company_info: CompanyInfo;
  country: Country;
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
