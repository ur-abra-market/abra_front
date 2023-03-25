import httpService from './http.service';

export const sellerFetch = {
  getSellerInfo: async () => {
    const { data } = await httpService.get<IUserInfoFetch>('sellers/get_seller_info');

    return data;
  },
  sendSellerInfo: async (sellerData: ISellerData) => {
    const { data } = await httpService.post<
      SendSellerResponse,
      any,
      Partial<ISellerProfile>
    >('sellers/send_seller_info', {
      seller_data: {
        first_name: sellerData.first_name,
        last_name: sellerData.last_name,
      },
    });

    return data;
  },
  addAddress: ({ seller_data, seller_address_data }: ISellerProfile) => {
    return httpService.post<ISellerProfile>('sellers/send_seller_info', {
      seller_data,
      seller_address_data,
    });
  },
};

// get seller info interfaces

export interface IUserInfoFetch {
  result: IUserResultFetch;
}

export interface IUserResultFetch {
  user_profile_info: IUserProfile;
  user_adresses: {};
  notifications: ISellerNotificationsData;
  profile_image: {
    null: null;
  };
}
interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// send seller info interfaces

interface IErrorDetail {
  loc: [string, number];
  msg: string;
  type: string;
}

interface ISendSellerErrorResponse {
  detail: IErrorDetail[];
}

export interface ISellerData {
  first_name: string;
  last_name: string;
}

interface ISellerAddressData {
  country: string;
  area: string;
  city: string;
  street: string;
  building: string;
  appartment: string;
  postal_code: string;
}

export interface AddAddressFormData {
  seller_data: ISellerData;
  seller_address_data: ISellerAddressData;
}

interface ISellerNotificationsData {
  on_discount: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_stock_again: boolean;
  on_product_is_cheaper: boolean;
  on_your_favorites_new: boolean;
  on_account_support: boolean;
}

export interface ISellerProfile {
  seller_data: ISellerData;
  seller_address_data: ISellerAddressData;
  seller_notifications_data: ISellerNotificationsData;
}

export type SendSellerResponse = string | ISendSellerErrorResponse;
