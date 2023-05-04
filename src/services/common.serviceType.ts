export type CountriesType = {
  ok: boolean;
  result: CountryType[];
  detail: string;
  error: string;
  error_code: number;
};

export type CountryType = {
  id: number;
  country: string;
  country_code: string;
};
