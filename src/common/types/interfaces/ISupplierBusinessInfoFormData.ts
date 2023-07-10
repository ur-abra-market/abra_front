import { ISupplierBusinessInfo } from 'store/reducers/supplier/profile';

export interface ISupplierBusinessInfoFormData
  extends Omit<ISupplierBusinessInfo, 'companyLogoId' | 'companyLogo' | 'phoneId'> {}
