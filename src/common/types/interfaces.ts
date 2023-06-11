export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;

  // todo check IPersonalInfoFormData
  countryId: number | null;
}

export interface IPersonalInfoRequestData {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}
