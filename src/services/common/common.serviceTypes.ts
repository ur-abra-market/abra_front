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
