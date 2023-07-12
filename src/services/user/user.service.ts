import { IAccountPersonalInfoResponse } from './user.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';
import { IAccountPersonalInfoRequest } from 'services/common/common.serviceTypes';

export const userService = {
  fetchAccountPersonalInfo: async () => {
    const { data } = await baseConfigService.get<
      IBaseResponse<IAccountPersonalInfoResponse>
    >(`users/account/personalInfo/`);

    return data.result;
  },

  updateAccountPersonalInfo: async (params: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(
      `users/account/personalInfo/update/`,
      params,
    );

    return data.result;
  },

  getFavoritesProducts: async () => {
    const { data } = await baseConfigService.get(`users/showFavorites/`);

    return data;
  },
};
