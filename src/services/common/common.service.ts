import { baseConfigService } from '../baseConfig.service';

import { IBaseResponse, ICountry, INumberEmployees } from './common.serviceTypes';

export const commonService = {
  getCountry: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ICountry[]>>(
      `common/country/`,
    );

    return data.result;
  },

  fetchCompanyNumberEmployees: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<INumberEmployees[]>>(
      'common/numberEmployees/',
    );

    return data.result;
  },

  getAllCategories: async () => {
    const { data } = await baseConfigService.get(`categories/all/`);

    return data;
  },
};
