import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { CountryCode, isValidNumber } from 'libphonenumber-js';
import { useFormContext } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { IPersonalInfoFormData } from '../../common/types';
import { getCountries } from '../../store/reducers/commonSlice';
import { Label } from '../../ui-kit';

import style from './PhoneNumberInput.module.scss';

interface IPhoneNumberInput {
  key: string;
  countryShort: string;
  phoneInputClass?: string;
  label: string;
}

export const PhoneNumberInput: FC<IPhoneNumberInput> = ({
  key,
  countryShort,
  phoneInputClass,
  label,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.common.countries);
  const countryShortCodes = countries.map(el => el.country_short);
  const [phoneInputKey, setPhoneInputKey] = useState(key); // phoneInputKey is needed for re-rendering  PhoneInput, without it PhoneInput doesn't rerender after initialization

  const {
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IPersonalInfoFormData>();

  const phoneNumberValue = watch('phoneNumber');
  const phoneNumberError = errors.phoneNumber?.message;

  // useEffect(() => {
  //   const asyncDispatch = async (): Promise<void> => {
  //     await dispatch(getCountries());
  //     setPhoneInputKey(String(Date.now()));
  //   };
  //
  //   asyncDispatch();
  // }, []);

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

  return (
    <div className={style.phone_number}>
      <Label label={label} htmlFor="tel">
        <PhoneInput
          inputClass={phoneInputClasses}
          buttonClass={phoneButtonClasses}
          country={countryShort}
          value={phoneNumberValue}
          onChange={handlePhoneInputOnChange}
          onlyCountries={countryShortCodes}
          countryCodeEditable={false}
        />

        {phoneNumberError && <span className={style.error}>{phoneNumberError}</span>}
      </Label>
    </div>
  );
};
