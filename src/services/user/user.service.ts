import { IUserNotificationsData } from '../../store/reducers/userSlice';
import baseConfigService from '../baseConfig.service';
import {
  IAccountPersonalInfoRequest,
  IAccountPersonalInfoResponse,
} from '../common/common.serviceTypes';
import { IErrorResponse } from '../seller/seller.serviceTypes';

export enum Action {
  UPLOAD_LOGO = 'users/uploadLogoImage/',
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

  uploadFile: async (payload: {
    action: string;
    file: File;
    quaries?: { product_id: number; serial_number: number };
  }) => {
    const { action, file, quaries } = payload;
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await baseConfigService.post(action, formData, { params: quaries });

    return data;
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
