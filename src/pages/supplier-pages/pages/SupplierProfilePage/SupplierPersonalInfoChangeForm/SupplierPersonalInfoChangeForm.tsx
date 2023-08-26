import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SupplierPersonalInfoChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSetPersonalInfoValues } from 'common/hooks/useSetPersonalInfoValues';
import { IPersonalInfoFormData, LoadingStatusEnum } from 'common/types';
<<<<<<< Updated upstream
import { parsePhoneNumber } from 'common/utils';
import { ButtonLogOut } from 'elements/ButtonLogOut/ButtonLogOut';
import { PhoneNumber } from 'elements/Phone/PhoneNumber';
=======
import { parsePhoneNumber, personalInfoFormValidationSchema } from 'common/utils';
import { ButtonLogout } from 'elements';
>>>>>>> Stashed changes
import { PersonalInfoChangeForm } from 'modules';
import { countriesSelector } from 'store/reducers/commonSlice';
import {
  updatePersonalInfo,
  userLoadingSelector,
  userPersonalInfoSelector,
} from 'store/reducers/userSlice';
import { Button } from 'ui-kit';

interface IPhoneData {
  phoneNumberBody: string;
  phoneNumberCountryId: number;
}
export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading =
    useAppSelector(userLoadingSelector).personalInfoLoading === LoadingStatusEnum.Loading;
  const data = useAppSelector(userPersonalInfoSelector);

  const { lastName, firstName, countryShort, phoneNumber } = data;
  const countries = useAppSelector(countriesSelector);

  // const formMethods = useForm<IPersonalInfoFormData>({
  //   resolver: yupResolver(personalInfoFormValidationSchema),
  //   mode: 'all',
  // });
  //
  // const { watch, handleSubmit, formState, setValue } = formMethods;
  //

  //
  // const numberCountry = countries.find(c => c.country_short === countryShort);
  //
  // useSetPersonalInfoValues(setValue, data, numberCountry);
  //
  // const [phoneNumberValue, lastNameValue, firstNameValue, countryShortValue] = watch([
  //   'phoneNumber',
  //   'lastName',
  //   'firstName',
  //   'countryShort',
  // ]);
  //
  // const serverPhoneNumber = `${numberCountry?.country_code}${phoneNumber}`;
  //
  // const { numberFull: currentPhoneNumber } = parsePhoneNumber(phoneNumberValue || '');
  //
  // const isPersonalInfoFormDisable =
  //   currentPhoneNumber === serverPhoneNumber &&
  //   lastNameValue === lastName &&
  //   firstNameValue === firstName &&
  //   countryShortValue === countryShort;
  //
  // const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
  //   let phoneNumberBody;
  //
  //   if (currentPhoneNumber !== serverPhoneNumber) {
  //     const { numberBody } = parsePhoneNumber(data.phoneNumber);
  //
  //     phoneNumberBody = numberBody;
  //   }
  //
  //   const updatePersonalInfoData = {
  //     first_name: data.firstName,
  //     last_name: data.lastName,
  //     phone_number: phoneNumberBody || phoneNumber,
  //     country_id: data.countryId,
  //   };
  //
  //   dispatch(updatePersonalInfo(updatePersonalInfoData));
  // };

  const formMethodsPhone = useForm<IPhoneData>({
    mode: 'all',
  });
  const { handleSubmit } = formMethodsPhone;
  const onSubmitPhone = (data: any): void => {
    console.log(data);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      {/* <FormProvider {...formMethods}> */}
      {/*  <form onSubmit={handleSubmit(onSubmit)}> */}
      {/*    <PersonalInfoChangeForm countryShort={countryShort} /> */}

      {/*    <Button */}
      {/*      type="submit" */}
      {/*      disabled={isLoading || !formState.isValid || isPersonalInfoFormDisable} */}
      {/*      className={style.submit_button} */}
      {/*      label="Save" */}
      {/*    /> */}
      {/*  </form> */}
      {/* </FormProvider> */}

      <FormProvider {...formMethodsPhone}>
        <form onSubmit={handleSubmit(onSubmitPhone)} className={style.phone_form}>
          <PhoneNumber countryId={2} phoneNumber="555555555" />

          <Button type="submit" className={style.submit_button} label="Save" />
        </form>
      </FormProvider>
    </div>
  );
};
