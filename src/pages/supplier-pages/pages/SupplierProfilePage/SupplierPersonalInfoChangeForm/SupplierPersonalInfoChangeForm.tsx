import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { personalInfoFormValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { IPersonalInfoFormData } from '../../../../../common/types';
import { ButtonLogOut } from '../../../../../components/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from '../../../../../modules';
import { supplierPersonalInfoSelector } from '../../../../../store/reducers/supplier/profile';
import {
  getPersonalInfo,
  updatePersonalInfo,
} from '../../../../../store/reducers/userSlice';
import { Button } from '../../../../../ui-kit';

import style from './SupplierPersonalInfoChangeForm.module.scss';

export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const { lastName, firstName, countryShort, phoneNumber } = useAppSelector(
    supplierPersonalInfoSelector,
  );
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
  }, [lastName, firstName, phoneNumber]);

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
    defaultValues: {
      lastName: '',
      firstName: '',
      phoneNumber: '',
      countryId: null,
    },
  });
  const { watch, handleSubmit, formState, setValue } = formMethods;

  const [phoneNumberValue, lastNameValue, firstNameValue] = watch([
    'phoneNumber',
    'lastName',
    'firstName',
  ]);

  const isPersonalInfoFormDisable =
    phoneNumberValue === phoneNumber &&
    lastNameValue === lastName &&
    firstNameValue === firstName;

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    dispatch(
      updatePersonalInfo({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        country_id: data.countryId,
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
