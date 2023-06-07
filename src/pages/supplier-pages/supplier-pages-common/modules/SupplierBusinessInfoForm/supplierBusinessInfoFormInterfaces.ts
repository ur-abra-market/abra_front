interface IBusinessSector {
  label: string;
  value: string;
}

export interface ISupplierBusinessInfoFormValues {
  email: string;
  code: string;
  aboutBusiness: string;
  tel: string;
  yearEstablished: number | null;
  address: string;
  checkbox: boolean;
  numEmployees: string;
  storeName: string;
  businessSector: IBusinessSector | null;
  entrepreneurNumber: string;
}
