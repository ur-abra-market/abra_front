import httpService from './http.service';

export interface License {
  license_number: number;
}

export interface CompanyInfo {
  name: string;
  business_sector: string;
  is_manufacturer: number;
  year_established: number;
  number_of_employees: number;
  description: string;
  phone: string;
  business_email: string;
  address: string;
}

export interface RequestAccountInfo {
  user_info: {
    first_name: string;
    last_name?: string;
    user_phone?: string;
  };
  license: License;
  company_info: {
    name: string;
    business_sector: string;
    is_manufacturer: number;
    year_established?: number;
    number_of_employees?: number;
    description?: string;
    phone?: string;
    business_email?: string;
    address?: string;
  };
}

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/getSupplierInfo/`);

    return data.result;
  },
  sendAccountData: async (personalData: any) => {
    const { data } = await httpService.post(`suppliers/sendAccountInfo/`, personalData);

    return data;
  },
};

export default supplierAccountData;
