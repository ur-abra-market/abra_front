import { IUserNotificationsData } from '../store/reducers/userSlice';

import {
  IAccountPersonalInfoRequest,
  IAccountPersonalInfoResponse,
} from './common.serviceType';
import httpService from './http.service';
import { IErrorResponse } from './seller.service';

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
    const { data } = await httpService.patch<IAccountPersonalInfoResponse>(
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
  updateNotification: async (updatedData: IUserNotificationsData) => {
    const { data } = await httpService.patch<string | IErrorResponse>(
      `/users/updateNotifications/`,
      updatedData,
    );

    return data;
  },
};

export default userService;
