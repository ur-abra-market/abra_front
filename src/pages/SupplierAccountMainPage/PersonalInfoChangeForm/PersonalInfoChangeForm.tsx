import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { Input, Label } from '../../../components/ui-kit';
import { IAccountInfoData } from '../../../interfaces';

import style from './PersonalInfoChangeForm.module.css';

export const PersonalInfoChangeForm = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IAccountInfoData>();

  return (
    <>
      <div className={style.name_container}>
        <Label label="First name" htmlFor="firstName">
          <Input
            id="firstName"
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </Label>

        <Label label="Last name" htmlFor="lastName">
          <Input
            id="lastName"
            placeholder="Johnson"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </Label>
      </div>

      <div className={style.phone_number}>
        <Label label="Personal phone number" htmlFor="tel">
          <Controller
            name="tel"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                inputClass={style.phone}
                buttonClass={style.phone_flag}
                country="us"
                value={field.value}
                onChange={(value, data, event, formattedValue) => {
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
        </Label>
        {errors.tel?.message && <span className={style.error}>{errors.tel.message}</span>}
      </div>
    </>
  );
};
