export interface IBaseResponse<R> {
  ok: true;
  result: R;
  detail: 'string';
  error: 'string';
  error_code: 0;
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

export type NumberEmployeesType = INumberEmployees[];

export interface IAccountPersonalInfoRequest {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export interface ResponseGetNumberEmployees {
  ok: boolean;
  result: NumberEmployeesType[];
}
