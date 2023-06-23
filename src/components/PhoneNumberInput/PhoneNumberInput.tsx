import React, { FC, ChangeEvent } from 'react';

import 'react-phone-input-2/lib/style.css';
import cn from 'classnames';
import { CountryCode, isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import { useAppSelector } from '../../common/hooks';
import { IPersonalInfoFormData } from '../../common/types';
import { Label } from '../../ui-kit';

import style from './PhoneNumberInput.module.scss';

interface IPhoneNumberInput {
  label: string;
  countryShort?: string;
  phoneInputClass?: string;
}

export const PhoneNumberInput: FC<IPhoneNumberInput> = ({
  countryShort,
  phoneInputClass,
  label,
}): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);

  const {
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  const phoneNumberError = errors.phone_number?.message;

  const handlePhoneInputOnChange = (
    value: string,
    data: CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void => {
    const countryId = countries.find(el => el.country_short === data.countryCode)?.id;

    if (countryId) {
      setValue('country_id', countryId);
    }

    setValue('phone_number', formattedValue);
    const isPhoneNumberValid = isValidNumber(
      formattedValue,
      data.countryCode.toUpperCase() as CountryCode,
    );

    if (!isPhoneNumberValid) {
      setError('phone_number', {
        type: 'manual',
        message: 'Please enter a valid phone number',
      });
    } else {
      clearErrors('phone_number');
      setValue('phone_number', formattedValue, { shouldValidate: true });
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
    <div className={style.phone_number}>
      <Label label={label} htmlFor="tel">
        {countries.length && (
          <PhoneInput
            inputClass={phoneInputClasses}
            buttonClass={phoneButtonClasses}
            country={countryShort || 'ru'}
            value={watch('phone_number')}
            onChange={handlePhoneInputOnChange}
            onlyCountries={countries.map(el => el.country_short)}
            countryCodeEditable={false}
          />
        )}
        {phoneNumberError && <span className={style.error}>{phoneNumberError}</span>}
      </Label>
    </div>
  );
};
