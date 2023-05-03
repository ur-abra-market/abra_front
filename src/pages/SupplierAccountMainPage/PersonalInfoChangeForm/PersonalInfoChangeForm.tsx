import React from 'react';

import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';

import { Input, Label, Select } from '../../../components/ui-kit';
import { PHONE_DATA } from '../../../constants/phone_data'; // todo get phone numbers from backend
import { IAccountInfoData } from '../../../interfaces';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  register: UseFormRegister<IAccountInfoData>;
  errors: DeepMap<Record<string, any>, FieldError>;
}

export const PersonalInfoChangeForm = ({
  register,
  errors,
}: IPersonalInfoChangeForm): JSX.Element => {
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
          <Select placeholder="Select" options={PHONE_DATA} {...register('code')} />
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
