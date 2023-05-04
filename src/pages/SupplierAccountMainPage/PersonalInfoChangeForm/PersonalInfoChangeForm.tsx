import React, { useEffect, useState } from 'react';

import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';

import { Input, Label, Select } from '../../../components/ui-kit';
import { IOption } from '../../../components/ui-kit/Select/Select.props';
import { IAccountInfoData } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCountries } from '../../../store/reducers/commonSlice';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  register: UseFormRegister<IAccountInfoData>;
  errors: DeepMap<Record<string, any>, FieldError>;
}

export const PersonalInfoChangeForm = ({
  register,
  errors,
}: IPersonalInfoChangeForm): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);
  const [countriesCodes, setCountriesCodes] = useState<IOption[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validCountriesCodes = countries.map(c => ({
      label: `+${c.country_code}`,
      value: `+${c.country_code}`,
    }));

    setCountriesCodes(validCountriesCodes);
  }, [countries]);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <>
      <div className={style.name_container}>
        <Label label="First name">
          <Input
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </Label>

        <Label label="Last name">
          <Input
            placeholder="Johnson"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </Label>
      </div>

      <div className={style.phone_number}>
        <Label label="Personal phone number">
          <Select placeholder="Select" options={countriesCodes} {...register('code')} />
        </Label>
        <Input
          placeholder="(XXX) XXX - XX - XX"
          {...register('tel')}
          error={errors?.tel?.message}
        />
      </div>
    </>
  );
};
