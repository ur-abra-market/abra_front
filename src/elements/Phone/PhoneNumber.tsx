import React, { FC, useEffect, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import style from './PhoneNumber.module.scss';
import {
  defaultPhoneCountryCodeValue,
  getFormattedPhoneNumberBody,
  getCountriesWithFlags,
  getPhoneCountryCodeValue,
} from './utils';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { countriesSelector, getCountries } from 'store/reducers/commonSlice';
import { Input, ISelectOption, Select } from 'ui-kit';

interface IPhoneNumber {
  countryIdField: string;
  phoneNumberBodyField: string;
  disabled: boolean;
  label?: string;
}

export const PhoneNumber: FC<IPhoneNumber> = ({
  countryIdField,
  phoneNumberBodyField,
  label,
  disabled,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const inputElement = useRef<HTMLInputElement>(null);
  const countries = useAppSelector(countriesSelector);
  const countriesWithFlag = getCountriesWithFlags(countries);
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>(
    defaultPhoneCountryCodeValue,
  );
  const [phoneNumberBody, setPhoneNumberBody] = useState('');
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const { onChange: onRegisterChange } = register(phoneNumberBodyField);
  const phoneNumberBodyValue = watch(phoneNumberBodyField);
  const phoneNumberCountryIdValue = watch(countryIdField);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountries());
    }
    setValue(countryIdField, defaultPhoneCountryCodeValue.value);
  }, []);

  useEffect(() => {
    if (!phoneNumberBody && phoneNumberBodyValue) {
      setPhoneNumberBody(
        getFormattedPhoneNumberBody(phoneNumberBodyValue, phoneNumberCountryIdValue),
      );

      setPhoneCountryCode(
        getPhoneCountryCodeValue(phoneNumberCountryIdValue, countriesWithFlag),
      );
    }
  }, [phoneNumberBodyValue]);

  const formatPhoneNumberBody = (numberBody: string): void => {
    // keep only the numbers from the incoming input value
    const phoneNumberBodyRawValue = numberBody.replace(/\D/g, '');

    // save cursor position
    const selectionStart = inputElement.current?.selectionStart;
    const selectionEnd = inputElement.current?.selectionEnd;

    // if an empty string is received and phoneNumberBody exists, it means the input should be cleared
    if (!phoneNumberBodyRawValue && phoneNumberBody) {
      // to clear the input set the empty string to phoneNumberBody
      setPhoneNumberBody('');
      setValue(phoneNumberBodyField, '', {
        // Recalculate validation after setting the value
        shouldValidate: true,
      });

      return;
    }
    debugger;
    // get the phone number body formatted by the country mask with countryCode
    const formattedNumber = getFormattedPhoneNumberBody(
      phoneNumberBodyRawValue,
      phoneCountryCode.value,
    );

    debugger;
    // if formattedNumber is empty, then do not display anything on ui
    if (!formattedNumber) {
      return;
    }
    debugger;
    // if formattedNumber exists, set it to phoneNumberBody so that the number is displayed on ui
    setPhoneNumberBody(formattedNumber);
    setValue(phoneNumberBodyField, formattedNumber.replace(/\D/g, ''), {
      // Recalculate validation after setting the value
      shouldValidate: true,
    });

    // restore cursor position after state update
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.selectionStart = selectionStart || 0;
        inputElement.current.selectionEnd = selectionEnd || 0;
      }
    }, 0);
  };

  useEffect(() => {
    if (phoneNumberBodyValue) {
      formatPhoneNumberBody(phoneNumberBodyValue);
    }
  }, [phoneCountryCode]);

  const handlePhoneCountryCodeChange = (value: ISelectOption): void => {
    const country = countriesWithFlag.find(country => country.id === value.value);

    setPhoneCountryCode({
      label: { text: `+${country?.country_code}`, image_src: country?.country_flag },
      value: value.value,
    });

    setValue(countryIdField, value.value);
  };

  const handlePhoneNumberBodyChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<any> => {
    onRegisterChange(e);
    formatPhoneNumberBody(e.currentTarget.value);
  };

  if (!countriesWithFlag.length) return <div />;

  return (
    <>
      {label && (
        <label htmlFor="phone_number_input" className={style.label}>
          {label}
        </label>
      )}

      <div className={style.wrapper}>
        <Select
          controlledValue={phoneCountryCode}
          width="166px"
          className={style.select}
          disabled={disabled}
          onChange={handlePhoneCountryCodeChange}
          options={countriesWithFlag.map(c => ({
            label: { text: `+${c.country_code} ${c.country}`, image_src: c.country_flag },
            value: c.id,
          }))}
        />

        <Input
          {...register(phoneNumberBodyField)}
          id="phone_number_input"
          ref={inputElement}
          className={style.input}
          value={phoneNumberBody}
          onChange={handlePhoneNumberBodyChange}
          error={errors?.[phoneNumberBodyField]?.message as string}
          disabled={disabled}
        />
      </div>
    </>
  );
};
