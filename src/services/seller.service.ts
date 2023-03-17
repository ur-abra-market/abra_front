// import httpService from './http.service';

// const sellerFetch = {
//   getSellerInfo: async () => {
//     const { data } = await httpService.get<SellerFetchType>('sellers/get_seller_info');
//
//     return data;
//   },
//   sendSellerInfo: async (sellerData: SellerProfileSendType) => {
//     const { data } = await httpService.post<SellerSendType, any, SellerProfileSendType>(
//       'sellers/send_seller_info',
//       sellerData,
//     );
//
//     return data;
//   },
// };

// interface SellerFetchType {
//   user_profile_info: SellerProfileFetchType;
//   user_adresses: {};
//   notifications: {
//     on_discount: boolean;
//     on_order_updates: boolean;
//     on_order_reminders: boolean;
//     on_stock_again: boolean;
//     on_product_is_cheaper: boolean;
//     on_your_favorites_new: boolean;
//     on_account_support: boolean;
//   };
//   profile_image: {
//     null: null;
//   };
// }
//
// interface SellerProfileFetchType {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
// }
//
// interface SellerSendType extends Partial<SellerFetchType> {}
// interface SellerProfileSendType extends Partial<SellerProfileFetchType> {}
