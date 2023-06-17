interface IBusinessSector {
  value: string;
}

interface ICountryRegistration {
  label: string;
  value: number;
}

export interface ISupplierBusinessInfoFormValues {
  shopName: string;
  businessSector: IBusinessSector;
  isManufacturer: boolean;
  licenseNumber: string;
  yearEstablished: number;
  numberEmployees: number;
  countryRegistration: ICountryRegistration;
  description: string;
  businessEmail: string;
  address: string;
  code: string;
  tel: string;
}
