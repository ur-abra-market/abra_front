import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './PhoneNumber.module.scss';
import { PhoneCountryShortType, formatPhoneNumber, validatePhoneNumber } from './utils';

import {
  Country1,
  Country2,
  Country3,
  Country4,
  Country5,
  Country6,
  Country7,
  Country8,
  Country9,
} from 'assets/icons';
import flag1 from 'assets/icons/flags/1_Azerbaijan.svg';
import flag2 from 'assets/icons/flags/2_Belarus.svg';
import flag3 from 'assets/icons/flags/3_Kazakhstan.svg';
import flag4 from 'assets/icons/flags/4_Kyrgyzstan.svg';
import flag5 from 'assets/icons/flags/5_Russian _Federation.svg';
import flag6 from 'assets/icons/flags/6_Tajikistan.svg';
import flag7 from 'assets/icons/flags/7_Turkey.svg';
import flag8 from 'assets/icons/flags/8_Ukraine.svg';
import flag9 from 'assets/icons/flags/9_Uzbekistan.svg';
import { useAppSelector } from 'common/hooks';
import { ICountry } from 'services/common/common.serviceTypes';
import { Input, ISelectOption, Select } from 'ui-kit';

const thisForm = yup.object({ phoneNumberBody: yup.string().required() });

interface formType {
  phoneNumberBody: string;
}

const countryFlags: { [key: number]: string } = {
  1: flag1,
  2: flag2,
  3: flag3,
  4: flag4,
  5: flag5,
  6: flag6,
  7: flag7,
  8: flag8,
  9: flag9,
};

interface ICountryWithFlag extends ICountry {
  country_flag: string;
}
export const PhoneNumber = (): JSX.Element => {
  const inputElement = useRef<HTMLInputElement>(null);
  const countries = useAppSelector(state => state.common.countries);
  const countriesWithFlag: ICountryWithFlag[] = countries.map(c => ({
    ...c,
    country_flag: countryFlags[c.id],
  }));

  console.log(countriesWithFlag);
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>({
    label: { text: '+7', image_src: flag5 },
    value: 5,
  });
  const [phoneNumberBody, setPhoneNumberBody] = useState('');
  const [phoneCountryShort, setPhoneCountryShort] = useState<PhoneCountryShortType>('az');
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(thisForm),
    mode: 'onChange',
    defaultValues: {
      phoneNumberBody: '',
    },
  });

  const onSubmit = (data: any): void => {
    console.log(data);
  };

  useEffect(() => {
    getPhoneNumberBodyWithMask(phoneNumberBody);
  }, [phoneCountryShort]);

  const handlePhoneCountryCodeOnChange = (value: ISelectOption): void => {
    const country = countriesWithFlag.find(country => country.id === value.value);

    if (country) setPhoneCountryShort(country.country_short as PhoneCountryShortType);
    setPhoneCountryCode({
      label: { text: `+${country?.country_code}`, image_src: country?.country_flag },
      value: value.value,
    });
  };

  function getPhoneNumberBodyWithMask(numberBody: string): void {
    const phoneNumberBodyRawValue = numberBody.replace(/\D/g, ''); // оставляем из пришедшего значения инпута только цифры

    // save cursor position
    const selectionStart = inputElement.current?.selectionStart;
    const selectionEnd = inputElement.current?.selectionEnd;

    if (!phoneNumberBodyRawValue && phoneNumberBody) {
      // если пришла пуста строка вместо цифр и при этом есть текущее значение тела номера телефона - значит пользователь хочет очистить инпут телефона. поэтому мы сохраняем пустую строку в тело номера телефона и выкидываем ошибку
      setPhoneNumberBody('');
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });

      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumberBodyRawValue, phoneCountryShort); // получаем отформатированное по маске страны с countryCode тело телефонного номера

    if (!formattedNumber) return; // если вернулась пустая строка (то есть телефон превысил значение маски) тогда мы ничего не будем сохранять в инпут и выводить на ui

    setPhoneNumberBody(formattedNumber); // в противном случае сохраняем значение на ui

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
  }

  const onChangePhoneNumberBody = (e: React.ChangeEvent<HTMLInputElement>): void => {
    getPhoneNumberBodyWithMask(e.currentTarget.value);
  };

  if (!countriesWithFlag.length) return <div />;

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        <Select
          controlledValue={phoneCountryCode}
          width="160"
          className={style.select}
          onChange={handlePhoneCountryCodeOnChange}
          options={countriesWithFlag.map(c => ({
            label: { text: `+${c.country_code} ${c.country}`, image_src: c.country_flag },
            value: c.id,
          }))}
        />
        <Input
          {...register('phoneNumberBody')}
          ref={inputElement}
          value={phoneNumberBody}
          onChange={onChangePhoneNumberBody}
          error={errors?.phoneNumberBody?.message}
        />
      </form>
    </div>
  );
};
