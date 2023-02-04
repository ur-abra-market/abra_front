import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/get_supplier_info/`, {
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
  postAccountData: async personalData => {
    const { data } = await httpService.post(
      `suppliers/send_account_info/`,
      personalData,
      {
        headers: { 'X-CSRF-TOKEN': access },
      },
    );

    return data;
  },
  getNotifications: async () => {
    const { data } = await httpService.get(`users/get_notifications/`, {
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
  postNotifications: async notifications => {
    const { data } = await httpService.post(`users/update_notification/`, notifications, {
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
};

export default supplierAccountData;
