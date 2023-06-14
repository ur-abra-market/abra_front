export type BaseResponseType<R> = {
  data: {
    ok: true;
    result: R;
    detail: 'string';
    error: 'string';
    error_code: 0;
  };
};

export type CountryType = {
  id: number;
  country: string;
  country_short: string;
};

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
type NumberEmployeesType = {
  id: number;
  number: string;
};
