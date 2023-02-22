import httpService from './http.service';

const userFetch = {
  uploadLogoImage: async (img: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post('users/upload_logo_image/', formData);

    return data;
  },
};

export default userFetch;
