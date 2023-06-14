interface IBusinessSector {
  value: string;
}

interface ICountryRegistration {
  label: string;
  value: number;
}

export interface ISupplierBusinessInfoFormValues {
  email: string;
  code: string;
  description: string;
  tel: string;
  yearEstablished: number;
  address: string;
  isManufacturer: boolean;
  numEmployees: string;
  storeName: string;
  businessSector: IBusinessSector;
  license: string;
  countryRegistration: ICountryRegistration;
}
