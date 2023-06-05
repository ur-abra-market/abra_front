import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { accountPersonalInfoValidationSchema } from '../../../../../common/constants';
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../../../common/hooks/useAppSelector';
import { IPersonalInfoFormData } from '../../../../../common/types';
import { parsePhoneNumber } from '../../../../../common/utils/parsePhoneNumber';
import { ButtonLogOut } from '../../../../../components/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from '../../../../../modules';
import { updateAccountPersonalInfo } from '../../../../../store/reducers/formRegistrationSlice';
import {
  getPersonalInfo,
  personalInfoSelector,
} from '../../../../../store/reducers/userSlice';
import { Button } from '../../../../../ui-kit';

import style from './PersonalInfo.module.scss';

export const PersonalInfo = (): JSX.Element => {
  const { lastName, firstName, phoneCountryCode, phoneNumberBody } =
    useAppSelector(personalInfoSelector);
  const phoneNumber = `${phoneCountryCode}${phoneNumberBody}`;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPersonalInfo());
  }, []);

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(accountPersonalInfoValidationSchema),
    mode: 'all',
    defaultValues: {
      firstName,
      lastName,
      phoneNumber,
    },
  });
  const { watch, handleSubmit, formState } = formMethods;

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

    const result = await dispatch(
      updateAccountPersonalInfo({
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
