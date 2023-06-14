import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { personalInfoFormValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { IPersonalInfoFormData } from '../../../../../common/types';
import { parsePhoneNumber } from '../../../../../common/utils/parsePhoneNumber';
import { ButtonLogOut } from '../../../../../components/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from '../../../../../modules';
import { countriesSelector } from '../../../../../store/reducers/commonSlice';
import { supplierPersonalInfoSelector } from '../../../../../store/reducers/supplier/profile';
import {
  getPersonalInfo,
  updatePersonalInfo,
} from '../../../../../store/reducers/userSlice';
import { Button } from '../../../../../ui-kit';

import style from './SupplierPersonalInfoChangeForm.module.scss';

export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { lastName, firstName, countryShort, phoneNumber } = useAppSelector(
    supplierPersonalInfoSelector,
  );
  const countries = useAppSelector(countriesSelector);
  const numberCountry = countries.find(c => c.country_short === countryShort);

  useEffect(() => {
    dispatch(getPersonalInfo());
  }, []);

  useEffect(() => {
    if (lastName && firstName && numberCountry) {
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phoneNumber', `${numberCountry.country_code}${phoneNumber}`);
      setValue('countryId', numberCountry.id);
    }
  }, [lastName, firstName, phoneNumber]);

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });
  const { watch, handleSubmit, formState, setValue } = formMethods;

  const [phoneNumberValue, lastNameValue, firstNameValue] = watch([
    'phoneNumber',
    'lastName',
    'firstName',
  ]);

  const { numberFull: currentPhoneNumber } = parsePhoneNumber(phoneNumberValue || '');
  const serverPhoneNumber = `${numberCountry?.country_code}${phoneNumber}`;

  const isPersonalInfoFormDisable =
    currentPhoneNumber === serverPhoneNumber &&
    lastNameValue === lastName &&
    firstNameValue === firstName;

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    let phoneNumberBody;

    if (currentPhoneNumber !== serverPhoneNumber) {
      const { numberBody } = parsePhoneNumber(data.phoneNumber);

      phoneNumberBody = numberBody;
    }

    const updatePersonalInfoData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: phoneNumberBody || phoneNumber,
      country_id: data.countryId,
    };

    dispatch(updatePersonalInfo(updatePersonalInfoData));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm countryShort={countryShort} />

          <Button
            type="submit"
            disabled={!formState.isValid || isPersonalInfoFormDisable}
            className={style.submit_button}
            label="Save"
          />
        </form>
      </FormProvider>
    </div>
  );
};
