import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { personalInfoFormValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { IPersonalInfoFormData } from '../../../../../common/types';
import { parsePhoneNumber } from '../../../../../common/utils/parsePhoneNumber';
import { ButtonLogOut } from '../../../../../components/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from '../../../../../modules';
import { supplierPersonalInfoSelector } from '../../../../../store/reducers/supplier/account';
import {
  getPersonalInfo,
  updatePersonalInfo,
} from '../../../../../store/reducers/userSlice';
import { Button } from '../../../../../ui-kit';

import style from './SupplierPersonalInfoChangeForm.module.scss';

export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const { lastName, firstName, phoneCountryCode, phoneNumberBody } = useAppSelector(
    supplierPersonalInfoSelector,
  );
  const phoneNumber = `${phoneCountryCode}${phoneNumberBody}`;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPersonalInfo());
  }, []);

  useEffect(() => {
    if (lastName && firstName && phoneNumber) {
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phoneNumber', phoneNumber);
    }
  }, [lastName, firstName, phoneCountryCode, phoneNumberBody]);

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
    defaultValues: {
      lastName: '',
      firstName: '',
      phoneNumber: '',
    },
  });
  const { watch, handleSubmit, formState, setValue } = formMethods;

  const [phoneNumberValue, lastNameValue, firstNameValue] = watch([
    'phoneNumber',
    'lastName',
    'firstName',
  ]);

  const { numberFull } = parsePhoneNumber(phoneNumberValue);

  const isPersonalInfoFormDisable =
    phoneNumber === numberFull &&
    lastNameValue === lastName &&
    firstName === firstNameValue;

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    const { countryCode, numberBody } = parsePhoneNumber(data.phoneNumber);

    dispatch(
      updatePersonalInfo({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_country_code: phoneNumber === numberFull ? phoneCountryCode : countryCode,
        phone_number: phoneNumber === numberFull ? phoneNumberBody : numberBody,
      }),
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm />

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
