import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const formRegistration = {
  suppliers: async ({ path, rest }: any) => {
    const { data } = await httpService.post(
      `suppliers/${path}/`,
      { ...rest },
      // @ts-ignore
      { headers: { 'X-CSRF-TOKEN': access } },
    );

    return data;
  },
};

export default formRegistration;
