import React, { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { IPersonalInfoFormData } from '../../common/types';
import { PhoneNumberInput } from '../../components';
import { Input, Label } from '../../ui-kit';

import style from './PersonalInfoChangeForm.module.scss';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
  countryShort?: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
  countryShort,
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
            {...register('first_name')}
            error={errors.first_name?.message}
          />
        </Label>

        <Label label="Last name" htmlFor="lastName">
          <Input
            id="lastName"
            placeholder="Johnson"
            {...register('last_name')}
            error={errors.last_name?.message}
          />
        </Label>
      </div>

      <PhoneNumberInput
        countryShort={countryShort}
        phoneInputClass={phoneInputClass}
        label="Personal phone number"
      />
    </>
  );
};
