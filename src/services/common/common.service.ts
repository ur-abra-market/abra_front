import { IAllCategories, ICountry, INumberEmployees } from './common.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';

export const commonService = {
  getCountry: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ICountry[]>>(
      `common/country`,
    );

    return data.result;
  },

  fetchCompanyNumberEmployees: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<INumberEmployees[]>>(
      'common/numberEmployees',
    );

    return data.result;
  },

  fetchAllCategories: async () => {
    const { data } = await baseConfigService.get<IAllCategories>(`categories/all`);

    return data;
  },
};
