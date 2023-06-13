export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IPersonalInfoRequestData {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export interface IServerResponse<R> {
  ok: boolean;
  result: R;
}
