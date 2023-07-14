import React, { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import style from './PersonalInfoChangeForm.module.scss';

import { useAppSelector } from 'common/hooks';
import { IPersonalInfoFormData, LoadingStatusEnum } from 'common/types';
import { PhoneNumberInput } from 'elements';
import { userLoadingSelector } from 'store/reducers/userSlice';
import { Input, Label } from 'ui-kit';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
  countryShort?: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
  countryShort,
}): JSX.Element => {
  const isLoading =
    useAppSelector(userLoadingSelector).personalInfoLoading === LoadingStatusEnum.Loading;

  const {
    register,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  return (
    <fieldset disabled={isLoading}>
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
        disabled={isLoading}
        countryShort={countryShort}
        phoneInputClass={phoneInputClass}
        label="Personal phone number"
      />
    </fieldset>
  );
};
