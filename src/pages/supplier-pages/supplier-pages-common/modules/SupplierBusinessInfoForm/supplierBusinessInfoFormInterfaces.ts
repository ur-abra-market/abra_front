interface IBusinessSector {
  value: string;
}

interface ICountryRegistration {
  label: string;
  value: number | null;
}

export interface ISupplierBusinessInfoFormValues {
  email: string;
  code: string;
  description: string;
  tel: string;
  yearEstablished: number | null;
  address: string;
  isManufacturer: boolean;
  numEmployees: number | null;
  storeName: string;
  businessSector: IBusinessSector;
  license: string;
  countryRegistration: ICountryRegistration;
}
