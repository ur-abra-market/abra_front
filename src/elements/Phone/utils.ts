import flag1 from 'assets/icons/flags/1_Azerbaijan.svg';
import flag2 from 'assets/icons/flags/2_Belarus.svg';
import flag3 from 'assets/icons/flags/3_Kazakhstan.svg';
import flag4 from 'assets/icons/flags/4_Kyrgyzstan.svg';
import flag5 from 'assets/icons/flags/5_Russian _Federation.svg';
import flag6 from 'assets/icons/flags/6_Tajikistan.svg';
import flag7 from 'assets/icons/flags/7_Turkey.svg';
import flag8 from 'assets/icons/flags/8_Ukraine.svg';
import flag9 from 'assets/icons/flags/9_Uzbekistan.svg';
import { ICountry } from 'services/common/common.serviceTypes';
import { ISelectOption } from 'ui-kit';

// --------------flags images--------------

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
export interface IDefaultPhoneNumberValue {
  countryCode: ISelectOption;
  countryShort: PhoneCountryShortType;
}

export interface ICountryWithFlag extends ICountry {
  country_flag: string;
}

// --------------values--------------
export const defaultPhoneNumberValue: IDefaultPhoneNumberValue = {
  countryCode: {
    label: { text: '+7', image_src: flag5 },
    value: 5,
  },
  countryShort: 'ru',
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
    country_flag: countryFlags[c.id],
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

export const formatPhoneNumber = (
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
