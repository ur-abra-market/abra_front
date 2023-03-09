import httpService from './http.service';

const formRegistration = {
  suppliers: async ({ path, rest }: any) => {
    const { data } = await httpService.patch(`suppliers/${path}/`, { ...rest });

    return data;
  },
};

export default formRegistration;
