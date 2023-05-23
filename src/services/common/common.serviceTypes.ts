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
  country_code: string;
};

export interface IAccountPersonalInfoRequest {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export interface IAccountPersonalInfoResponse {
  ok: boolean;
  result?: true;
  detail?: string;
  error: [
    {
      msg: string;
      type: string;
    },
  ];
  error_code: number;
}
