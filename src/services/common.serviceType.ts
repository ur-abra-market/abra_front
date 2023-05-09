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
