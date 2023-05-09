import { BaseResponseType, CountryType } from './common.serviceType';
import httpService from './http.service';

const commonService = {
  getCountry: async () => {
    const { data } = await httpService.get<BaseResponseType<CountryType[]>>(
      `/common/country/`,
    );

    return data;
  },
};

export default commonService;
