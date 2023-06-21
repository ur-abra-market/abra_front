import { ResponseCategoryType } from '../../store/reducers/categorySlice';
import baseConfigService from '../baseConfig.service';

import {
  CountriesType,
  IBaseResponseType,
  IGetAllCategories,
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

  getAllCategories: async () => {
    const { data } = await baseConfigService.get<IGetAllCategories>(`/categories/all/`);

    return data;
  },
};
