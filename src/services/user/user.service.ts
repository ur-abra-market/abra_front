import { IAccountPersonalInfoResponse } from './user.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';
import { IAccountPersonalInfoRequest } from 'services/common/common.serviceTypes';

export const userService = {
  getUserPersonalInfo: async () => {
    const { data } = await baseConfigService.get<
      IBaseResponse<IAccountPersonalInfoResponse>
    >(`users/account/personalInfo`); // TODO have a new data in response body (created, updated)

    return data.result;
  },

  updateUserPersonalInfo: async (params: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(
      `users/account/personalInfo/update`,
      params,
    );

    return data.result;
  },

  getFavoritesProducts: async () => {
    const { data } = await baseConfigService.get(`sellers/favorites`); // TODO dont work

    return data;
  },
};
