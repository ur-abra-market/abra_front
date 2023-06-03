import React, { FC } from 'react';

import cn from 'classnames';
import { isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { IAccountPersonalInfo } from '../../../../../common/types/interfaces';
import { Input, Label } from '../../../../../ui-kit';

import style from './PersonalInfoChangeForm.module.css';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
}): JSX.Element => {
  const {
    register,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IAccountPersonalInfo>();

  const phoneNumberValue = watch('phoneNumber');
  const phoneNumberError = errors.phoneNumber?.message;

  const handlePhoneInputOnChange = (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void => {
    setValue('phoneNumber', formattedValue);
    const isPhoneNumberValid = isValidNumber(formattedValue);

    if (!isPhoneNumberValid) {
      setError('phoneNumber', {
        type: 'manual',
        message: 'Please enter a valid phone number',
      });
    } else {
      clearErrors('phoneNumber');
      setValue('phoneNumber', formattedValue, { shouldValidate: true });
    }
  };

  const phoneInputClasses = cn({
    [style.phone]: true,
    ...(phoneInputClass ? { [phoneInputClass]: true } : {}),
    [style.phone_error]: Boolean(phoneNumberError),
  });

  const phoneButtonClasses = cn({
    [style.phone_flag]: true,
    [style.phone_flag_error]: Boolean(phoneNumberError),
  });

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
          <PhoneInput
            inputClass={phoneInputClasses}
            buttonClass={phoneButtonClasses}
            country="us"
            value={phoneNumberValue}
            onChange={handlePhoneInputOnChange}
          />
        </Label>
        {phoneNumberError && <span className={style.error}>{phoneNumberError}</span>}
      </div>
    </>
  );
};
