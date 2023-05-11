import React from 'react';

import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { Input, Label } from '../../../components/ui-kit';
import { IAccountInfoData } from '../../../interfaces';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  register: UseFormRegister<IAccountInfoData>;
  errors: DeepMap<Record<string, any>, FieldError>;
  control: Control<IAccountInfoData>;
  setIsPhoneComplete?: (isComplete: boolean) => void;
}

export const PersonalInfoChangeForm = ({
  register,
  errors,
  control,
  setIsPhoneComplete,
}: IPersonalInfoChangeForm): JSX.Element => {
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
                  // if ('format' in data && data.format) {
                  //   if (data.format.length === formattedValue.length) {
                  //     field.onChange(formattedValue);
                  //   }
                  // }
                  const isFormatted = 'format' in data && data.format !== null;
                  const isComplete =
                    isFormatted && data.format.length === formattedValue.length;

                  // @ts-ignore
                  console.log(
                    isFormatted,
                    isComplete,
                    // @ts-ignore
                    data.format.length,
                    formattedValue.length,
                    data,
                    value,
                  );
                  field.onChange(value);
                  if (setIsPhoneComplete) {
                    if (isComplete) {
                      setIsPhoneComplete(isComplete);
                    } else {
                      setIsPhoneComplete(false);
                    }
                  }
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
