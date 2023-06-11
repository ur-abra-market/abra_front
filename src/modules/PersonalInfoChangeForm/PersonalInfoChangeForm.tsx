import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

import { IPersonalInfoFormData } from '../../common/types';
import { Input, Label } from '../../ui-kit';

import style from './PersonalInfoChangeForm.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getCountries } from 'store/reducers/commonSlice';

interface IPersonalInfoChangeForm {
  phoneInputClass?: string;
  countryShort: string;
}

export const PersonalInfoChangeForm: FC<IPersonalInfoChangeForm> = ({
  phoneInputClass,
  countryShort,
}): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);
  const dispatch = useAppDispatch();

  const countryShortCodes = countries.map(el => el.country_short);

  const {
    register,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  const phoneNumberValue = watch('phoneNumber');
  const phoneNumberError = errors.phoneNumber?.message;

  const handlePhoneInputOnChange = (
    value: string,
    data: CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void => {
    const countryId = countries.find(el => el.country_short === data.countryCode)?.id;

    if (countryId) {
      setValue('countryId', countryId);
    }

    setValue('phoneNumber', formattedValue);
    const isPhoneNumberValid = isValidNumber(formattedValue);

    if (!isPhoneNumberValid) {
      setError('phoneNumber', {
        type: 'manual',
        message: 'Please enter a valid phone number',
      });
    } else {
      clearErrors('phoneNumber');
      setValue('phoneNumber', value, { shouldValidate: true });
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

  // phoneInputKey is needed for rerendering  PhoneInput, without it PhoneInput doesn't rerender after initialization
  const [phoneInputKey, setPhoneInputKey] = useState(Date.now());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const asyncDispatch = async () => {
      await dispatch(getCountries());
      setPhoneInputKey(Date.now());
    };

    asyncDispatch();
  }, []);

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
            key={phoneInputKey}
            inputClass={phoneInputClasses}
            buttonClass={phoneButtonClasses}
            country={countryShort}
            value={phoneNumberValue}
            onChange={handlePhoneInputOnChange}
            onlyCountries={countryShortCodes}
            countryCodeEditable={false}
          />
        </Label>
        {phoneNumberError && <span className={style.error}>{phoneNumberError}</span>}
      </div>
    </>
  );
};
