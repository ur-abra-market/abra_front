import baseConfigService from '../baseConfig.service';

import {
  CountriesType,
  AllCategories,
  IBaseResponseType,
  NumberEmployeesType,
} from './common.serviceTypes';

export const commonService = {
  getCountry: async () => {
    const { data } = await baseConfigService.get<IBaseResponseType<CountriesType>>(
      `/common/country/`,
    );

    return data.result;
  },

  fetchCompanyNumberEmployees: async () => {
    const { data } = await baseConfigService.get<IBaseResponseType<NumberEmployeesType>>(
      'common/numberEmployees/',
    );

    return data.result;
  },

  fetchAllCategories: async () => {
    const { data } = await baseConfigService.get<AllCategories>(`/categories/all/`);

    return data;
  },
};
