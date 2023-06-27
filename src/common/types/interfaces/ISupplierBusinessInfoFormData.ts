import { ISupplierBusinessInfo } from 'store/reducers/supplier/profile/slice';

export interface ISupplierBusinessInfoFormData
  extends Omit<ISupplierBusinessInfo, 'companyLogoId' | 'companyLogo' | 'phoneId'> {}
