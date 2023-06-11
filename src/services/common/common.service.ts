import baseConfigService from '../baseConfig.service';

import { ResponseGetNumberEmployees } from './common.serviceTypes';

export const commonService = {
  getCountry: async () => {
    const { data } = await baseConfigService.get(`/common/country/`);

    return data;
  },

  getAllCategories: async () => {
    const { data } = await baseConfigService.get(`/categories/all/`);

    return data;
  },

  fetchCompanyNumberEmployees: () => {
    return baseConfigService.get<ResponseGetNumberEmployees>('common/numberEmployees/');
  },
};
