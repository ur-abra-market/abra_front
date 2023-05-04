import { CountriesType } from './common.serviceType';
import httpService from './http.service';

const commonService = {
  getCountry: async () => {
    const { data } = await httpService.get<CountriesType>(`/common/country/`);

    return data;
  },
};

export default commonService;
