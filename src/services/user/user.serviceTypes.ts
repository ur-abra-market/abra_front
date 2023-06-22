import { ICountry } from '../common/common.serviceTypes';

export interface IResponse<T> {
  result: T;
}
export interface IAccountPersonalInfoResponse {
  country: ICountry;
  id: number;
  datetime: string;
  phone_country_code: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  is_deleted: boolean;
  is_supplier: boolean;
}

export interface IUploadImageRequest {
  action: string;
  file: File;
  queries?: { product_id: number; serial_number: number };
}

export interface IUploadImageResponse {
  ok: boolean;
  result: { id: number; url: string };
}

export interface IDeleteImageRequest {
  action: string;
  queries: { company_image_id: number; order?: number };
}
