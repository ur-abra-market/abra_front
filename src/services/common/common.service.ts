import baseConfigService from '../baseConfig.service';

import {
  CountriesType,
  GetAllCategories,
  IBaseResponseType,
  NumberEmployeesType,
} from './common.serviceTypes';

export interface IResponseCategory {
  id: number;
  name: string;
  level: number;
  children?: IResponseCategory[] | [];
  parent_id?: number;
}

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
    const { data } = await baseConfigService.get<GetAllCategories>(`/categories/all/`);

    console.log(data);

    return data;
  },
};
