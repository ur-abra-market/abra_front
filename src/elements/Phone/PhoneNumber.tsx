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
  const [phoneCountryCode, setPhoneCountryCode] = useState<ISelectOption>({
    label: 'Russia',
    value: 5,
  });
  const [phoneNumberBody, setPhoneNumberBody] = useState('');
  const [phoneCountryShort, setPhoneCountryShort] = useState('ru');
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

    if (country) setPhoneCountryShort(country.country_short);
    setPhoneCountryCode(value);
  };

  const validatePhoneNumber = (
    phoneNumber: string,
    phoneNumberCountyCode: string,
  ): boolean => {
    if (phoneNumberCountyCode === 'ru') {
      return /^9\d{9}$/.test(phoneNumber); // Проверяем, что номер РФ начинается с 9
    }

    if (phoneNumberCountyCode === 'az') {
      return /^[4567]\d{8}$/.test(phoneNumber); // Проверяем, что номер азербайджана начинается 4, 5, 6 или 7
    }

    if (phoneNumberCountyCode === 'by') {
      return /^[2345]\d{8}$/.test(phoneNumber); // Проверяем, что номер беларуси начинается с 2, 3, 4, или 5
    }

    if (phoneNumberCountyCode === 'kz') {
      return /^7\d{9}$/.test(phoneNumber); // Проверяем, что номер казахстана начинается с 7
    }

    return true;
  };

  const getFormattedPhoneNumberBody = (
    phoneNumberBody: string,
    phoneNumberCountyCode: string,
  ): string => {
    const numberBody = phoneNumberBody;

    if (phoneNumberCountyCode === 'ru') {
      // россия
      if (phoneNumberBody.length <= 10) {
        return numberBody.replace(
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
    if (phoneNumberCountyCode === 'az') {
      // азербайджан
      if (phoneNumberBody.length <= 9) {
        return numberBody.replace(
          /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/,

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

    if (phoneNumberCountyCode === 'by') {
      // беларусь
      if (phoneNumberBody.length <= 9) {
        return numberBody.replace(
          /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/,

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

    if (phoneNumberCountyCode === 'kz') {
      // казахстан
      if (phoneNumberBody.length <= 10) {
        return numberBody.replace(
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

  console.log(phoneCountryShort);

  const onChangePhoneNumberBody = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.currentTarget.value;
    const rawValue = inputValue.replace(/\D/g, ''); // оставляем только цифры

    if (!rawValue && phoneNumberBody) {
      // если приходит значение пустое, и при этом текущее значение имеет данные - значит мы пытаемся очистить инпут телефона и надо засетаить пустую строку и выкинуть ошибку
      setPhoneNumberBody('');
      setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
    } else {
      const formattedNumber = getFormattedPhoneNumberBody(rawValue, phoneCountryShort); // получаем отформатированное по маске страны с countryCode тело телефонного номера

      if (formattedNumber) {
        setPhoneNumberBody(formattedNumber);
        if (!validatePhoneNumber(rawValue, phoneCountryShort)) {
          setError('phoneNumberBody', { message: 'Please, enter a valid phone number' });
        } else {
          clearErrors('phoneNumberBody');
        }
      }
    }
  };

  if (!countries.length) return <div />;

  return (
    <div className={style.wrapper}>
      {countries.length && (
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
          <Select
            controlledValue={phoneCountryCode}
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
