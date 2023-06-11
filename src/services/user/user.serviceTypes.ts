import { CountryType } from 'services/common/common.serviceTypes';

export interface IResponse<T> {
  result: T;
}
export interface IAccountPersonalInfoResponse {
  country: CountryType;
  id: number;
  datetime: string;
  phone_country_code: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  is_deleted: boolean;
  is_supplier: boolean;
}
