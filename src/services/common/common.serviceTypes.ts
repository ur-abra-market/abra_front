export interface IResponseCategory {
  id: number;
  name: string;
  level: number;
  children?: IResponseCategory[] | [];
  parent_id?: number;
}

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
  country_short: string;
  country_code: string;
  currency: string;
  flag: string;
}

export type CountriesType = ICountry[];

export interface INumberEmployees {
  id: number;
  number: string;
}

export type NumberEmployeesType = INumberEmployees[];

export interface ResponseGetNumberEmployees {
  ok: boolean;
  result: NumberEmployeesType[];
}

export interface IAccountPersonalInfoRequest {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export type AllCategories = Pick<IBaseResponseType<IResponseCategory[]>, 'ok' | 'result'>;
