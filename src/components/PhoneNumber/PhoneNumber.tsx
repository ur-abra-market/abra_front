import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  AsYouType,
  CountryCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppSelector } from '../../common/hooks';
import { Input, ISelectOption, Select } from '../../ui-kit';

import style from './PhoneNumber.module.scss';

const thisForm = yup.object({ phoneNumberBody: yup.string().required() });

interface formType {
  phoneNumberBody: string;
}

export const PhoneNumber = (): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);
  const [phoneValue, setPhoneValue] = useState<ISelectOption>();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(thisForm),
    mode: 'onChange',
    defaultValues: {
      phoneNumberBody: '',
    },
  });

  const watchPhoneNumber = watch('phoneNumberBody');

  const getCountryCode = (): string | undefined => {
    const country = countries.find(country => country.id === phoneValue?.value);

    return country?.country_short;
  };

  // useEffect(() => {
  //   const countryCode = getCountryCode()?.toUpperCase() as CountryCode;
  //
  //   if (countryCode && phoneValue) {
  //     // eslint-disable-next-line new-cap
  //     const formattedNumber = new AsYouType(countryCode).input(watchPhoneNumber);
  //
  //     setValue('phoneNumberBody', formattedNumber);
  //   }
  // }, [watchPhoneNumber, phoneValue]);

  useEffect(() => {
    const countryCode = getCountryCode()?.toUpperCase() as CountryCode;

    if (countryCode && phoneValue) {
      const input = watchPhoneNumber.replace(/\D/g, ''); // Оставить только цифры
      let formattedNumber = new AsYouType(countryCode).input(input);
      const phoneNumber = parsePhoneNumberFromString(formattedNumber, countryCode);

      if (phoneNumber?.number) {
        const numberLength = phoneNumber.number.length;
        const nationalNumberLength = phoneNumber.nationalNumber.length;

        debugger;
        // Обрезать номер телефона, если он превышает максимальную длину
        if (nationalNumberLength > numberLength) {
          debugger;
          formattedNumber = formattedNumber.slice(0, numberLength);
        }
      }
      // const maxLength = new AsYouType(countryCode).input('99999999999999999999').length;
      // const isValid = isValidPhoneNumber(formattedNumber, countryCode);
      //
      // if (!isValid) {
      //   formattedNumber = formattedNumber.slice(0, -1);
      // }
      //
      // if (formattedNumber.length > maxLength) {
      //   formattedNumber = formattedNumber.slice(0, maxLength);
      // }

      setValue('phoneNumberBody', formattedNumber);
    }
  }, [watchPhoneNumber, phoneValue]);

  const onSubmit = (data: any): void => {
    console.log(data);
  };

  useEffect(() => {
    if (countries.length) {
      setPhoneValue({
        label: `+${countries[0].country_code}`,
        value: countries[0].id,
      });
    }
  }, [countries]);

  useEffect(() => {}, [phoneValue]);

  const onChangeCustom = (value: ISelectOption): void => {
    setPhoneValue(value);
  };

  if (!countries.length) return <div />;

  return (
    <div className={style.wrapper}>
      {countries.length && (
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
          <Select
            customValue={phoneValue}
            onChange={onChangeCustom}
            options={countries.map(c => ({
              label: `+${c.country_code} ${c.country}`,
              value: c.id,
            }))}
          />
          <Input
            {...register('phoneNumberBody')}
            error={errors?.phoneNumberBody?.message}
          />
        </form>
      )}
    </div>
  );
};
