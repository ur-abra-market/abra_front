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
  yearEstablished: number | null;
  address: string;
  isManufacturer: boolean;
  numEmployees: string;
  storeName: string;
  businessSector: IBusinessSector | null;
  license: string;
  countryRegistration: ICountryRegistration | null;
}
