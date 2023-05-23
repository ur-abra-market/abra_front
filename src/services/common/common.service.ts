import baseConfigService from '../baseConfig.service';

import { BaseResponseType, CountryType } from './common.serviceTypes';

const commonService = {
  getCountry: async () => {
    const { data } = await baseConfigService.get<BaseResponseType<CountryType[]>>(
      `/common/country/`,
    );

    return data;
  },

  getAllCategories: async () => {
    const { data } = await baseConfigService.get(`/categories/all/`);

    return data;
  },
};

export default commonService;
