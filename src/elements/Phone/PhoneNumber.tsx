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
  const [phoneCountryShort, setPhoneCountryShort] = useState<CountryCode>('ru');
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

    if (country) setPhoneCountryShort(country.country_short as CountryCode);
    setPhoneCountryCode(value);
  };

  type CountryCode = 'ru' | 'az' | 'by' | 'kz' | 'kg' | 'tr' | 'tj' | 'ua' | 'uz';
  const validatePhoneNumber = (
    phoneNumber: string,
    phoneNumberCountyCode: CountryCode,
  ): boolean => {
    const countryPhoneRegex: Record<CountryCode, RegExp> = {
      ru: /^9\d{9}$/, // Russia: phone number body starts with 9 and has a length of 10
      az: /^[4567]\d{8}$/, // Azerbaijan: phone number body starts with 4, 5, 6, or 7 and has a length of 9
      by: /^[2345]\d{8}$/, // Belarus: phone number body starts with 2, 3, 4, or 5 and has a length of 9
      kz: /^7\d{9}$/, // Kazakhstan: phone number body starts with 7 and has a length of 10
      kg: /^[57]\d{9}$/, // Kyrgyzstan: phone number body starts with 5 or 7 and has a length of 10
      tr: /^5\d{9}$/, // Turkey: phone number body starts with 5 and has a length of 10
      tj: /^\d{9}$/, // Tajikistan: phone number body has a length of 9
      ua: /^\d{9}$/, // Ukraine: phone number body has a length of 9
      uz: /^\d{9}$/, // Uzbekistan: phone number body has a length of 9
    };

    const regex = countryPhoneRegex[phoneNumberCountyCode];

    return regex.test(phoneNumber);
  };

  const getFormattedPhoneNumberBody = (
    phoneNumberBody: string,
    phoneNumberCountyCode: string,
  ): string => {
    const changedNumberBody = phoneNumberBody;

    if (phoneNumberCountyCode === 'ru') {
      // россия
      if (phoneNumberBody.length <= 10) {
        return changedNumberBody.replace(
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
        return changedNumberBody.replace(
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
        return changedNumberBody.replace(
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
        return changedNumberBody.replace(
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

    if (phoneNumberCountyCode === 'kg') {
      // Киргизия
      if (phoneNumberBody.length <= 9) {
        return changedNumberBody.replace(
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

    if (phoneNumberCountyCode === 'tj') {
      // Таджикистан
      if (phoneNumberBody.length <= 9) {
        return changedNumberBody.replace(
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

    if (phoneNumberCountyCode === 'ua') {
      // Украина
      if (phoneNumberBody.length <= 9) {
        return changedNumberBody.replace(
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

    if (phoneNumberCountyCode === 'tr') {
      // Турция
      if (phoneNumberBody.length <= 10) {
        return changedNumberBody.replace(
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

    if (phoneNumberCountyCode === 'uz') {
      // Узбекистан
      if (phoneNumberBody.length <= 9) {
        changedNumberBody.replace(
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
