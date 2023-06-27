import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';

export interface ICategoryResponse {
  id: number;
  name: string;
  level: number;
  children?: ICategoryResponse[] | [];
  parent_id?: number;
}

export interface ICountry {
  id: number;
  country: string;
  country_short: string;
  country_code: string;
  currency: string;
  flag: string;
}

export interface INumberEmployees {
  id: number;
  number: string;
}

export interface IAccountPersonalInfoRequest {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export interface IDeleteImageRequest {
  action: string;
  queries: { company_image_id: number; order?: number };
}

export type IAllCategories = Pick<IBaseResponse<ICategoryResponse[]>, 'ok' | 'result'>;
