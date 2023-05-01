import React from 'react';

import { DeepMap, FieldError } from 'react-hook-form';

import { Input, Label, Select } from '../../../components/ui-kit';
import { COUNTRY_DATA } from '../../../constants/country_data';
import { PHONE_DATA } from '../../../constants/phone_data';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  register: any; // todo
  errors: DeepMap<Record<string, any>, FieldError>;
}

export const PersonalInfoChangeForm = ({
  register,
  errors,
}: IPersonalInfoChangeForm): JSX.Element => {
  return (
    <>
      <div className={style.add_name}>
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
      <Label label="Country of company registration">
        <Select
          placeholder="Select"
          options={COUNTRY_DATA}
          {...register('country')}
          error={errors?.country?.message}
        />
      </Label>
      <div className={style.phone_number}>
        <Label label="Personal phone number">
          <Select placeholder="Select" options={PHONE_DATA} {...register('code')} />
        </Label>
        <Input
          placeholder="(XXX) XXX - XX - XX"
          {...register('tel')}
          error={errors?.tel?.message}
        />
      </div>
      <Label label="License or entrepreneur number">
        <Input
          placeholder="000 – 00 – 0000"
          {...register('license')}
          error={errors?.license?.message}
        />
      </Label>
    </>
  );
};
