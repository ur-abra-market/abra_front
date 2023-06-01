import { IUserNotificationsData } from '../../store/reducers/userSlice';
import baseConfigService from '../baseConfig.service';
import {
  IAccountPersonalInfoRequest,
  IAccountPersonalInfoResponse,
} from '../common/common.serviceTypes';
import { IErrorResponse } from '../seller/seller.serviceTypes';

export enum Action {
  UPLOAD_LOGO_IMAGE = 'suppliers/uploadCompanyImage/',
  UPLOAD_ITEM_IMAGE = 'suppliers/uploadProductImage/',
}

const userService = {
  updateAccountPersonalInfo: async ({
    first_name,
    last_name,
    phone_country_code,
    phone_number,
  }: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.patch<IAccountPersonalInfoResponse>(
      `/users/account/update/`,
      {
        first_name,
        last_name,
        phone_country_code,
        phone_number,
      },
    );

    return data;
  },

  uploadLogoImage: async (img: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post('users/uploadLogoImage/', formData);

    return data;
  },

  uploadImage: async (payload: {
    action: string;
    file: File;
    queries?: { product_id: number; serial_number: number };
  }) => {
    const { action, file, queries } = payload;
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await baseConfigService.post<{
      ok: boolean;
      result: { id: number; url: string };
    }>(action, formData, {
      params: queries,
    });

    return data;
  },
  deleteImage: async (payload: {
    action: string;
    queries: { company_image_id: number; order?: number };
  }) => {
    const { data } = await baseConfigService.delete(payload.action, {
      params: payload.queries,
    });
  },
  getFavoritesProducts: async () => {
    const { data } = await baseConfigService.get(`/users/showFavorites/`);

    return data;
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IUserNotificationsData>(
      `/users/getNotifications/`,
    );

    return data;
  },

  updateNotification: async (updatedData: IUserNotificationsData) => {
    const { data } = await baseConfigService.patch<string | IErrorResponse>(
      `/users/updateNotifications/`,
      updatedData,
    );

    return data;
  },
};

export default userService;
