import { ISupplierBusinessInfo } from 'store/reducers/supplier/profile/types';

export interface ISupplierBusinessInfoFormData
  extends Omit<ISupplierBusinessInfo, 'companyLogoId' | 'companyLogo' | 'phoneId'> {}
