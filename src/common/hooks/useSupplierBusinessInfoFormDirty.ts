import { ISupplierBusinessInfoFormData } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { ISupplierBusinessInfo } from 'store/reducers/supplier/profile/slice';

export const useSupplierBusinessInfoFormDirty = (
  data: ISupplierBusinessInfoFormData,
  watch: any,
): { isDirty: boolean; isPhoneNumberDisable: boolean } => {
  const formValues: ISupplierBusinessInfo = watch();

  const serverPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
  const { numberFull: currentPhoneNumber } = parsePhoneNumber(
    formValues.phoneNumber || '',
  );

  const isPhoneNumberDisable = currentPhoneNumber === serverPhoneNumber;

  const isDirty =
    data.businessSector?.value !== formValues.businessSector?.value ||
    data.yearEstablished !== Number(formValues.yearEstablished) ||
    data.storeName !== formValues.storeName ||
    data.license !== formValues.license ||
    data.numEmployees !== Number(formValues.numEmployees) ||
    data.countryRegistration !== formValues.countryRegistration ||
    data.description !== formValues.description ||
    data.email !== formValues.email ||
    data.address !== formValues.address ||
    data.countryId !== formValues.countryId;

  return { isDirty, isPhoneNumberDisable };
};
