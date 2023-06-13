import React, { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import 'react-phone-input-2/lib/style.css';

import { IPersonalInfoFormData } from '../../common/types';
import { PhoneNumberInput } from '../../components';
import { Input, Label } from '../../ui-kit';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
  countryShort: string;
  key: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
  countryShort,
  key,
}): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

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

      <PhoneNumberInput
        key={key}
        countryShort={countryShort}
        phoneInputClass={phoneInputClass}
        label="Personal phone number"
      />
    </>
  );
};
