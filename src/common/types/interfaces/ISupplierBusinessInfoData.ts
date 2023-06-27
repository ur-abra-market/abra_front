import { ISupplierBusinessInfo } from 'store/reducers/supplier/profile/slice';

export interface ISupplierBusinessInfoData extends ISupplierBusinessInfo {
  countryId: number;
}
