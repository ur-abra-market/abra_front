import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './PhoneNumber.module.scss';

import { useAppSelector } from 'common/hooks';
import { Input, ISelectOption, Select } from 'ui-kit';

const thisForm = yup.object({ phoneNumberBody: yup.string().required() });

interface formType {
  phoneNumberBody: string;
}

export const PhoneNumber = (): JSX.Element => {
  const countries = useAppSelector(state => state.common.countries);
  const [phoneValue, setPhoneValue] = useState<ISelectOption>({
    label: 'Russia',
    value: 5,
  });
  const [phoneBodyValue, setPhoneBodyValue] = useState('');
  const {
    handleSubmit,
    register,
    watch,
    setValue,
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

  const getCountryCode = (countryId: number | string): string => {
    const country = countries.find(country => country.id === countryId);

    return country?.country_short || '';
  };

  const onSubmit = (data: any): void => {
    console.log(data);
  };

  useEffect(() => {
    if (countries.length) {
      setPhoneValue({
        label: `+${countries[0].country_code} ${countries[0].country}`,
        value: countries[0].id,
      });
    }
  }, [countries]);

  const onChangeCustom = (value: ISelectOption): void => {
    setPhoneValue(value);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Проверяем, что номер РФ начинается с 9
    return /^9\d{9}$/.test(phoneNumber);
  };

  const getFormattedPhoneNumberBody = (
    phoneNumberBody: string,
    phoneNumberCountyCode: string,
  ): string => {
    if (phoneNumberCountyCode === 'ru') {
      if (phoneNumberBody.length <= 10) {
        return phoneNumberBody.replace(
          /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/,

          (match, g1, g2, g3, g4) => {
            let result = '';

            result += g1 ? `${g1}` : '';
            result += g2 ? ` ${g2}` : '';
            result += g3 ? `-${g3}` : '';
            result += g4 ? `-${g4}` : '';

            return result;
          },
        );
      }

      return '';
    }

    return '';
  };

  const onChangePhoneNumberBody = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.currentTarget.value;
    const rawValue = inputValue.replace(/\D/g, ''); // оставляем только цифры

    if (!rawValue && phoneBodyValue) {
      // если приходит значение пустое, и при этом текущее значение имеет данные - значит мы пытаемся очистить инпут телеа телефона и надо засетаить пустую строку и выкинуть ошибку
      setPhoneBodyValue('');
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
    } else {
      const countryCode = getCountryCode(phoneValue.value).toLowerCase();
      const formattedNumber = getFormattedPhoneNumberBody(
        rawValue,
        countryCode as string,
      ); // получаем отформатированное по маске страны с countryCode тело телефонного номера

      if (formattedNumber) {
        setPhoneBodyValue(formattedNumber);
        if (!validatePhoneNumber(rawValue)) {
          setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
        } else {
          clearErrors('phoneNumberBody');
        }
      }
    }
  };

  // if (rawValue.length <= 10) {
  //   const formattedValue = rawValue.replace(
  //     /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/,
  //
  //     (match, g1, g2, g3, g4) => {
  //       let result = '';
  //
  //       result += g1 ? `${g1}` : '';
  //       result += g2 ? ` ${g2}` : '';
  //       result += g3 ? `-${g3}` : '';
  //       result += g4 ? `-${g4}` : '';
  //
  //       return result;
  //     },
  //   );
  //
  //   setPhoneBodyValue(formattedValue);
  //   if (!validatePhoneNumber(rawValue)) {
  //     setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
  //   } else {
  //     clearErrors('phoneNumberBody');
  //   }
  // } else {
  //   setPhoneBodyValue(phoneBodyValue);
  // }

  if (!countries.length) return <div />;

  return (
    <div className={style.wrapper}>
      {countries.length && (
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
          <Select
            controlledValue={phoneValue}
            onChange={onChangeCustom}
            options={countries.map(c => ({
              label: `+${c.country_code} ${c.country}`,
              value: c.id,
            }))}
          />
          <Input
            {...register('phoneNumberBody')}
            value={phoneBodyValue}
            onChange={onChangePhoneNumberBody}
            error={errors?.phoneNumberBody?.message}
          />
        </form>
      )}
    </div>
  );
};
