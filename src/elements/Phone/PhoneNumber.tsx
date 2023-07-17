import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import style from './PhoneNumber.module.scss';
import {
  defaultPhoneNumberValue,
  formatPhoneNumber,
  getCountriesWithFlags,
  PhoneCountryShortType,
  validatePhoneNumber,
} from './utils';

import { useAppDispatch, useAppSelector } from 'common/hooks';

import { getCountries } from 'store/reducers/commonSlice';
import { Input, ISelectOption, Select } from 'ui-kit';
import { IUserPersonalInfo } from 'store/reducers/userSlice';

export const PhoneNumber = ({}): JSX.Element => {
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.common.countries);
  const countriesWithFlag = getCountriesWithFlags(countries || []);
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>(
    defaultPhoneNumberValue.countryCode,
  );
  const [phoneNumberBody, setPhoneNumberBody] = useState('');
  const [phoneCountryShort, setPhoneCountryShort] = useState<PhoneCountryShortType>(
    defaultPhoneNumberValue.countryShort,
  );

  const {
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IUserPersonalInfo>();

  useEffect(() => {
    if (countries === null) {
      dispatch(getCountries());
    }
  }, []);

  const formatAndValidatePhoneNumberBody = (numberBody: string): any => {
    // keep only the numbers from the incoming input value
    const phoneNumberBodyRawValue = numberBody.replace(/\D/g, '');

    // save cursor position
    const selectionStart = inputElement.current?.selectionStart;
    const selectionEnd = inputElement.current?.selectionEnd;

    // if an empty string is received and phoneNumberBody exists, it means the input should be cleared
    if (!phoneNumberBodyRawValue && phoneNumberBody) {
      // to clear the input set the empty string to phoneNumberBody
      setPhoneNumberBody('');
      // set an error, because the empty phoneNumberBody input is not valid
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });

      return;
    }

    // get the phone number body formatted by the country mask with countryCode
    const formattedNumber = formatPhoneNumber(phoneNumberBodyRawValue, phoneCountryShort);

    // if formattedNumber is empty, then do not display anything on ui

    // if formattedNumber exists, set it to phoneNumberBody so that the number is displayed on ui
    //setPhoneNumberBody(formattedNumber);
    //setValue('phoneNumberBody', formattedNumber);

    // restore cursor position after state update
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.selectionStart = selectionStart || 0;
        inputElement.current.selectionEnd = selectionEnd || 0;
      }
    }, 0);

    if (!validatePhoneNumber(phoneNumberBodyRawValue, phoneCountryShort)) {
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
    } else {
      clearErrors('phoneNumberBody');
    }
    if (!formattedNumber) return numberBody;
    return formattedNumber;
  };

  useEffect(() => {
    formatAndValidatePhoneNumberBody(phoneNumberBody);
  }, [phoneCountryShort]);

  const handlePhoneCountryCodeChange = (value: ISelectOption): void => {
    const country = countriesWithFlag.find(country => country.id === value.value);

    if (country) setPhoneCountryShort(country.country_short as PhoneCountryShortType);
    setPhoneCountryCode({
      label: { text: `+${country?.country_code}`, image_src: country?.country_flag },
      value: value.value,
    });

    setValue('phoneNumberCountryId', value.value);
  };

  const handlePhoneNumberBodyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    formatAndValidatePhoneNumberBody(e.currentTarget.value);
  };

  if (!countriesWithFlag.length) return <div />;

  return (
    <div className={style.wrapper}>
      <Select
        controlledValue={phoneCountryCode}
        width="160"
        className={style.select}
        onChange={handlePhoneCountryCodeChange}
        options={countriesWithFlag.map(c => ({
          label: { text: `+${c.country_code} ${c.country}`, image_src: c.country_flag },
          value: c.id,
        }))}
      />

      {/* <Input
        {...register('phoneNumberBody')}
        ref={inputElement}
        // value={phoneNumberBody}
        onChange={handlePhoneNumberBodyChange}
        error={errors?.phoneNumberBody?.message}
      />*/}
      <Controller
        control={control}
        name="phoneNumberBody"
        render={({ field }) => (
          <Input
            {...field}
            onChange={e => {
              const processedValue = formatAndValidatePhoneNumberBody(e.target.value);

              field.onChange(processedValue); // передайте обработанное значение в обработчик onChange из поля
            }}
            error={errors?.phoneNumberBody?.message}
          />
        )}
      />
    </div>
  );
};
