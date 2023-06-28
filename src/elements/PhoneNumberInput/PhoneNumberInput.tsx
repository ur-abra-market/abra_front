import React, { FC, ChangeEvent } from 'react';

import 'react-phone-input-2/lib/style.css';
import cn from 'classnames';
import { CountryCode, isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import style from './PhoneNumberInput.module.scss';

import { useAppSelector } from 'common/hooks';
import { IPersonalInfoFormData } from 'common/types';
import { Label } from 'ui-kit';

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

  const phoneNumberError = errors.phoneNumber?.message;

  const handlePhoneInputOnChange = (
    value: string,
    data: CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void => {
    const countryId = countries.find(el => el.country_short === data.countryCode)?.id;

    setValue('countryShort', data?.countryCode);
    if (countryId) {
      setValue('countryId', countryId);
    }

    // setValue('phoneNumber', formattedValue);
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
    [style.phone_flag_error]: Boolean(phoneNumberError),
  });

  const priority = countryShort === 'kz' ? { ca: 0, us: 1, kz: 0, ru: 1 } : undefined;

  return (
    <div className={style.phone_number}>
      <Label label={label} htmlFor="tel">
        {countries.length && (
          <PhoneInput
            key={countryShort}
            inputClass={phoneInputClasses}
            buttonClass={phoneButtonClasses}
            country={countryShort || ''}
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
