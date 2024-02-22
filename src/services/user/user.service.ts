import { IAccountPersonalInfoResponse, IFavoriteRequest } from './user.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';
import { IAccountPersonalInfoRequest } from 'services/common/common.serviceTypes';

export const userService = {
  getUserPersonalInfo: async () => {
    const { data } = await baseConfigService.get<
      IBaseResponse<IAccountPersonalInfoResponse>
    >(`users/account/personalInfo`);

    return data.result;
  },

  updateUserPersonalInfo: async (params: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(
      `users/account/personalInfo/update`,
      params,
    );

    return data.result;
  },

  getFavoritesProducts: async ({ offset, limit }: IFavoriteRequest) => {
    const params = { offset, limit };
    const { data } = await baseConfigService.get(`sellers/favorites`, { params });

    return data.result;
  },
};
