import { CountriesEnum } from 'common/types';
import { COUNTRY_FLAGS } from 'common/utils';
import { CountiesType, ICountry } from 'services/common/common.serviceTypes';
import { ISelectOption } from 'ui-kit';

// --------------types--------------

export type PhoneCountryShortType =
  | 'ru'
  | 'az'
  | 'by'
  | 'kz'
  | 'kg'
  | 'tr'
  | 'tj'
  | 'ua'
  | 'uz';

interface ICountryPhoneInfo {
  maxPhoneLength: number;
  startRegex: RegExp;
  maskRegex: RegExp;
}
export interface IPhoneNumberValue {
  countryCodeData: ISelectOption;
  countryShort: PhoneCountryShortType;
}

export interface ICountryWithFlag extends ICountry {
  country_flag: string;
}

// --------------values--------------
export const defaultPhoneNumberValue: IPhoneNumberValue = {
  countryCodeData: {
    label: { text: '+7', image_src: COUNTRY_FLAGS[CountriesEnum.RUSSIAN] },
    value: CountriesEnum.RUSSIAN,
  },
  countryShort: 'ru',
};

export const getPhoneNumberValue = (
  countryId: number,
  countriesWithFlag: CountiesType,
): IPhoneNumberValue => {
  const country = countriesWithFlag.find(c => c.id === countryId) as ICountryWithFlag;

  return {
    countryCodeData: {
      label: {
        text: country.country_code,
        image_src: country.country_flag,
      },
      value: country.id,
    },
    countryShort: country.country_short as PhoneCountryShortType,
  };
};

const countryPhoneInfo: Record<PhoneCountryShortType, ICountryPhoneInfo> = {
  ru: {
    maxPhoneLength: 10,
    startRegex: /^9\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  az: {
    maxPhoneLength: 9,
    startRegex: /^[4567]\d{8}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  by: {
    maxPhoneLength: 9,
    startRegex: /^[2345]\d{8}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  kz: {
    maxPhoneLength: 10,
    startRegex: /^7\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  kg: {
    maxPhoneLength: 10,
    startRegex: /^[57]\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  tr: {
    maxPhoneLength: 10,
    startRegex: /^5\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  tj: {
    maxPhoneLength: 9,
    startRegex: /^\d{9}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  ua: {
    maxPhoneLength: 9,
    startRegex: /^\d{9}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  uz: {
    maxPhoneLength: 9,
    startRegex: /^\d{9}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
};

// --------------functions--------------

export const getCountriesWithFlags = (countries: ICountry[]): ICountryWithFlag[] => {
  return countries.map(c => ({
    ...c,
    country_flag: COUNTRY_FLAGS[c.id],
  }));
};

export const validatePhoneNumber = (
  phoneNumber: string,
  phoneNumberCountryCode: PhoneCountryShortType,
): boolean => {
  const countryInfo = countryPhoneInfo[phoneNumberCountryCode];

  if (!countryInfo) {
    return false;
  }

  return countryInfo.startRegex.test(phoneNumber);
};

export const formatPhoneNumberBody = (
  phoneNumberBody: string,
  phoneNumberCountryCode: PhoneCountryShortType,
): string => {
  const countryInfo = countryPhoneInfo[phoneNumberCountryCode];

  if (!countryInfo || phoneNumberBody.length > countryInfo.maxPhoneLength) {
    return '';
  }

  return phoneNumberBody.replace(countryInfo.maskRegex, (match, g1, g2, g3, g4) => {
    let result = '';

    result += g1 ? `${g1}` : '';
    result += g2 ? ` ${g2}` : '';
    result += g3 ? `-${g3}` : '';
    result += g4 ? `-${g4}` : '';

    return result;
  });
};
