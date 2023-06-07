export interface IBaseResponseType<R> {
  ok: true;
  result: R;
  detail: 'string';
  error: 'string';
  error_code: 0;
}

export interface ICountry {
  id: number;
  country: string;
  country_code: string;
}

export type CountriesType = ICountry[];

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
