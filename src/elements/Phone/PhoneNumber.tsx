import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './PhoneNumber.module.scss';
import { PhoneCountryShortType, formatPhoneNumber, validatePhoneNumber } from './utils';

import { useAppSelector } from 'common/hooks';
import { Input, ISelectOption, Select } from 'ui-kit';

const thisForm = yup.object({ phoneNumberBody: yup.string().required() });

interface formType {
  phoneNumberBody: string;
}

export const PhoneNumber = (): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>({
    label: 'Russia',
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
    if (countries.length) {
      setPhoneCountryCode({
        label: `+${countries[0].country_code} ${countries[0].country}`,
        value: countries[0].id,
      });
    }
  }, [countries]);

  const handlePhoneCountryCodeOnChange = (value: ISelectOption): void => {
    const country = countries.find(country => country.id === value.value);

    if (country) setPhoneCountryShort(country.country_short as PhoneCountryShortType);
    setPhoneCountryCode({ label: `+${country?.country_code}`, value: value.value });
  };

  const onChangePhoneNumberBody = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const phoneNumberBodyRawValue = e.currentTarget.value.replace(/\D/g, ''); // оставляем из пришедшего значения инпута только цифры

    if (!phoneNumberBodyRawValue && phoneNumberBody) {
      // если пришла пуста строка вместо цифр и при этом есть текущее значение тела номера телефона - значит пользователь хочет очистить инпут телефона. поэтому мы сохраняем пустую строку в тело номера телефона и выкидываем ошибку
      setPhoneNumberBody('');
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });

      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumberBodyRawValue, phoneCountryShort); // получаем отформатированное по маске страны с countryCode тело телефонного номера

    if (!formattedNumber) return; // если вернулась пустая строка (то есть телефон превысил значение маски) тогда мы ничего не будем сохранять в инпут и выводить на ui

    setPhoneNumberBody(formattedNumber); // в противном случае сохраняем значение на ui

    if (!validatePhoneNumber(phoneNumberBodyRawValue, phoneCountryShort)) {
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
    } else {
      clearErrors('phoneNumberBody');
    }
  };

  if (!countries.length) return <div />;

  return (
    <div className={style.wrapper}>
      {countries.length && (
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
          <Select
            controlledValue={phoneCountryCode}
            width="160"
            onChange={handlePhoneCountryCodeOnChange}
            options={countries.map(c => ({
              label: `+${c.country_code} ${c.country}`,
              value: c.id,
            }))}
          />
          <Input
            {...register('phoneNumberBody')}
            value={phoneNumberBody}
            onChange={onChangePhoneNumberBody}
            error={errors?.phoneNumberBody?.message}
          />
        </form>
      )}
    </div>
  );
};
