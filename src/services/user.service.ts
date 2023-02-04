import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const userFetch = {
  uploadLogoImage: async img => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post('users/upload_logo_image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': access,
      },
    });

    return data;
  },
};

export default userFetch;
