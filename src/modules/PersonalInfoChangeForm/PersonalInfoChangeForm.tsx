import React, { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import style from './PersonalInfoChangeForm.module.scss';

import { useAppSelector } from 'common/hooks';
import { IPersonalInfoFormData, LoadingStatusEnum } from 'common/types';
import { PhoneNumberInput } from 'elements';
import { supplierLoadingSelector } from 'store/reducers/supplier/profile';
import { Input, Label } from 'ui-kit';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
  countryShort?: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
  countryShort,
}): JSX.Element => {
  const isLoading = useAppSelector(supplierLoadingSelector);
  const {
    register,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  return (
    <>
      <div className={style.name_container}>
        <Label label="First name" htmlFor="firstName">
          <Input
            disabled={isLoading === LoadingStatusEnum.Loading}
            id="firstName"
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </Label>

        <Label label="Last name" htmlFor="lastName">
          <Input
            disabled={isLoading === LoadingStatusEnum.Loading}
            id="lastName"
            placeholder="Johnson"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </Label>
      </div>

      <PhoneNumberInput
        disabled={isLoading === LoadingStatusEnum.Loading}
        countryShort={countryShort}
        phoneInputClass={phoneInputClass}
        label="Personal phone number"
      />
    </>
  );
};
