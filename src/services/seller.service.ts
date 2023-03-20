import httpService from './http.service';

export const sellerFetch = {
  getSellerInfo: async () => {
    const { data } = await httpService.get<ISellerInfoFetch>('sellers/get_seller_info');

    return data;
  },
  // sendSellerInfo: async (sellerData: SellerProfileSendType) => {
  //   const { data } = await httpService.post<SellerSendType, any, SellerProfileSendType>(
  //     'sellers/send_seller_info',
  //     sellerData,
  //   );

  // return data;
  // },
};

export interface ISellerInfoFetch {
  result: ISellerResultFetch;
}

export interface ISellerResultFetch {
  user_profile_info: ISellerProfile;
  user_adresses: {};
  notifications: {
    on_discount: boolean;
    on_order_updates: boolean;
    on_order_reminders: boolean;
    on_stock_again: boolean;
    on_product_is_cheaper: boolean;
    on_your_favorites_new: boolean;
    on_account_support: boolean;
  };
  profile_image: {
    null: null;
  };
}
interface ISellerProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// interface SellerSendType extends Partial<ISellerInfoFetch> {}
// export interface SellerProfileSendType extends Partial<ISellerProfile> {}
