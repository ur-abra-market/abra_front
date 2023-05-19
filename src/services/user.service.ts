import { IUserNotificationsData } from '../store/reducers/userSlice';

import httpService from './http.service';
import { IErrorResponse, ISuccessResponse } from './seller.service';

export enum Action {
  UPLOAD_LOGO = 'users/uploadLogoImage/',
}

const userFetch = {
  uploadLogoImage: async (img: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post('users/uploadLogoImage/', formData);

    return data;
  },
  uploadFile: async (payload: {
    action: string;
    file: File;
    quaries?: { product_id: number; serial_number: number };
  }) => {
    const { action, file, quaries } = payload;
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await httpService.post(action, formData, { params: quaries });

    return data;
  },
  getFavoritesProducts: async () => {
    const { data } = await httpService.get(`/users/showFavorites/`);

    return data;
  },
  getNotifications: async () => {
    const { data } = await httpService.get<IUserNotificationsData>(
      `/users/getNotifications/`,
    );

    return data;
  },
  updateSupplierNotification: async (updatedData: ISupplierUpdateRequest) => {
    const { data } = await httpService.patch<ISuccessResponse | IErrorResponse>(
      `/users/business/update/`,
      updatedData,
    );

    return data;
  },
};

export default userFetch;

interface INotificationSupplierRequest {
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

export interface ISupplierUpdateRequest {
  supplier_data_request: {
    license_number: string;
  };
  company_data_request: {
    phone_country_code: string;
    phone_number: string;
    name: string;
    is_manufacturer: boolean;
    year_established: number;
    number_employees: number;
    description: string;
    address: string;
    logo_url: string;
    business_sector: string;
    business_email: string;
  };
  notification_data_request: INotificationSupplierRequest;
}
