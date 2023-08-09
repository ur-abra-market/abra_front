import { CountriesEnum } from 'common/types';
import { COUNTRY_FLAGS } from 'common/utils';
import { CountriesArrayType, ICountry } from 'services/common/common.serviceTypes';
import { ISelectOption } from 'ui-kit';

// --------------types--------------
interface ICountryPhoneInfo {
  maxPhoneLength: number;
  startRegex: RegExp;
  maskRegex: RegExp;
}

export interface ICountryWithFlag extends ICountry {
  country_flag: string;
}

// --------------values--------------
export const defaultPhoneCountryCodeValue: ISelectOption = {
  label: { text: '+7', image_src: COUNTRY_FLAGS[CountriesEnum.RUSSIAN] },
  value: CountriesEnum.RUSSIAN,
};

const countryPhoneInfo: Record<CountriesEnum, ICountryPhoneInfo> = {
  [CountriesEnum.RUSSIAN]: {
    maxPhoneLength: 10,
    startRegex: /^9\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.AZERBAIJAN]: {
    maxPhoneLength: 9,
    startRegex: /^[4567]\d{8}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.BELARUS]: {
    maxPhoneLength: 9,
    startRegex: /^[2345]\d{8}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.KAZAKHSTAN]: {
    maxPhoneLength: 10,
    startRegex: /^7\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.KYRGYZSTAN]: {
    maxPhoneLength: 10,
    startRegex: /^[57]\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.TURKEY]: {
    maxPhoneLength: 10,
    startRegex: /^5\d{9}$/,
    maskRegex: /^(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.TAJIKISTAN]: {
    maxPhoneLength: 9,
    startRegex: /^\d{9}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.UKRAINE]: {
    maxPhoneLength: 9,
    startRegex: /^\d{9}$/,
    maskRegex: /^(\d{1,2})?(\d{1,3})?(\d{1,2})?(\d{1,2})?$/,
  },
  [CountriesEnum.UZBEKISTAN]: {
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

export const getPhoneCountryCodeValue = (
  countryId: number,
  countriesWithFlag: CountriesArrayType,
): ISelectOption => {
  const country = countriesWithFlag.find(c => c.id === countryId) as ICountryWithFlag;

  return {
    label: {
      text: country.country_code,
      image_src: country.country_flag,
    },
    value: country.id,
  };
};

export const validatePhoneNumber = (
  phoneNumber: string,
  phoneCountryId: CountriesEnum,
): boolean => {
  const countryInfo = countryPhoneInfo[phoneCountryId];

  if (!countryInfo) {
    return false;
  }

  return countryInfo.startRegex.test(phoneNumber);
};

export const formatPhoneNumberBody = (
  phoneNumberBody: string,
  phoneCountryId: CountriesEnum,
): string => {
  const countryInfo = countryPhoneInfo[phoneCountryId];

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
