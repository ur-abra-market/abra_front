import React, { FC, ChangeEvent } from 'react';

import cn from 'classnames';
import { CountryCode, isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import { useAppSelector } from 'common/hooks';
import { IPersonalInfoFormData } from 'common/types';
import { Label } from 'ui-kit';

import 'react-phone-input-2/lib/style.css';
// eslint-disable-next-line import/order
import style from './PhoneNumberInput.module.scss';

interface IPhoneNumberInput {
  label: string;
  countryShort?: string;
  phoneInputClass?: string;
  disabled?: boolean;
}

export const PhoneNumberInput: FC<IPhoneNumberInput> = ({
  countryShort,
  phoneInputClass,
  label,
  disabled,
}): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);

  const {
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  const phoneNumberError = errors.phoneNumber?.message;

  const handlePhoneInputOnChange = (
    value: string,
    data: CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void => {
    const countryId = countries.find(el => el.country_short === data.countryCode)?.id;

    setValue('phoneNumber', formattedValue);
    setValue('countryShort', data?.countryCode);
    if (countryId) {
      setValue('countryId', countryId);
    }

    const isPhoneNumberValid = isValidNumber(
      formattedValue,
      data.countryCode.toUpperCase() as CountryCode,
    );

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
    [style.phone_flag_disabled]: disabled,
    [style.phone_flag_error]: Boolean(phoneNumberError),
  });

  const priority = countryShort === 'kz' ? { ca: 0, us: 1, kz: 0, ru: 1 } : undefined;

  return (
    <div className={style.phone_number}>
      <Label label={label} htmlFor="tel">
        {countries.length && (
          <PhoneInput
            disabled={disabled}
            key={countryShort}
            inputClass={phoneInputClasses}
            buttonClass={phoneButtonClasses}
            country={countryShort || 'ru'}
            value={watch('phoneNumber')}
            onChange={handlePhoneInputOnChange}
            onlyCountries={countries.map(el => el.country_short)}
            countryCodeEditable={false}
            priority={priority}
          />
        )}
        {phoneNumberError && <span className={style.error}>{phoneNumberError}</span>}
      </Label>
    </div>
  );
};
