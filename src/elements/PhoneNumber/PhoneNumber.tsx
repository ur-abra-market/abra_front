import React, { FC, useEffect, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import style from './PhoneNumber.module.scss';
import {
  defaultPhoneCountryCodeValue,
  formatPhoneNumberBody,
  getCountriesWithFlags,
  getPhoneCountryCodeValue,
  validatePhoneNumber,
} from './utils';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { CountriesEnum } from 'common/types';
import { countriesSelector, getCountries } from 'store/reducers/commonSlice';
import { Input, ISelectOption, Select } from 'ui-kit';

interface IPhoneNumberForm {
  phoneNumberBody: string;
  phoneNumberCountryId: number;
}

interface IPhoneNumber {
  countryId?: number;
  phoneNumber?: string;
}

export const PhoneNumber: FC<IPhoneNumber> = ({
  countryId,
  phoneNumber,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const inputElement = useRef<HTMLInputElement>(null);
  const countries = useAppSelector(countriesSelector);
  const countriesWithFlag = getCountriesWithFlags(countries);
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>(
    countryId
      ? getPhoneCountryCodeValue(countryId, countriesWithFlag)
      : defaultPhoneCountryCodeValue,
  );
  const [phoneNumberBody, setPhoneNumberBody] = useState(phoneNumber || '');

  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IPhoneNumberForm>();

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountries());
    }
    setValue('phoneNumberCountryId', defaultPhoneCountryCodeValue.value);
  }, []);

  const formatAndValidatePhoneNumberBody = (numberBody: string): void => {
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
    const formattedNumber = formatPhoneNumberBody(
      phoneNumberBodyRawValue,
      phoneCountryCode.value as CountriesEnum,
    );

    // if formattedNumber is empty, then do not display anything on ui
    if (!formattedNumber) return;

    // if formattedNumber exists, set it to phoneNumberBody so that the number is displayed on ui
    setPhoneNumberBody(formattedNumber);
    setValue('phoneNumberBody', formattedNumber.replace(/\D/g, ''));

    // restore cursor position after state update
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.selectionStart = selectionStart || 0;
        inputElement.current.selectionEnd = selectionEnd || 0;
      }
    }, 0);

    if (
      !validatePhoneNumber(
        phoneNumberBodyRawValue,
        phoneCountryCode.value as CountriesEnum,
      )
    ) {
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
    } else {
      clearErrors('phoneNumberBody');
    }
  };

  useEffect(() => {
    formatAndValidatePhoneNumberBody(phoneNumberBody);
  }, [phoneCountryCode]);

  const handlePhoneCountryCodeChange = (value: ISelectOption): void => {
    const country = countriesWithFlag.find(country => country.id === value.value);

    setPhoneCountryCode({
      label: { text: `+${country?.country_code}`, image_src: country?.country_flag },
      value: value.value,
    });

    setValue('phoneNumberCountryId', value.value);
  };

  const handlePhoneNumberBodyChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
    formatAndValidatePhoneNumberBody(e.currentTarget.value);
  };

  if (!countriesWithFlag.length) return <div />;

  return (
    <div className={style.wrapper}>
      <Select
        controlledValue={phoneCountryCode}
        width="166px"
        className={style.select}
        onChange={handlePhoneCountryCodeChange}
        options={countriesWithFlag.map(c => ({
          label: { text: `+${c.country_code} ${c.country}`, image_src: c.country_flag },
          value: c.id,
        }))}
      />

      <Input
        ref={inputElement}
        value={phoneNumberBody}
        onChange={handlePhoneNumberBodyChange}
        error={errors?.phoneNumberBody?.message}
      />
    </div>
  );
};
