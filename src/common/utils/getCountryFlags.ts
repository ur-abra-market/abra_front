import flag_1_Azerbaijan from 'assets/icons/flags/1_Azerbaijan.svg';
import flag_2_Belarus from 'assets/icons/flags/2_Belarus.svg';
import flag_3_Kazakhstan from 'assets/icons/flags/3_Kazakhstan.svg';
import flag_4_Kyrgyzstan from 'assets/icons/flags/4_Kyrgyzstan.svg';
import flag_5_Russian from 'assets/icons/flags/5_Russian _Federation.svg';
import flag_6_Tajikistan from 'assets/icons/flags/6_Tajikistan.svg';
import flag_7_Turkey from 'assets/icons/flags/7_Turkey.svg';
import flag_8_Ukraine from 'assets/icons/flags/8_Ukraine.svg';
import flag_9_Uzbekistan from 'assets/icons/flags/9_Uzbekistan.svg';
import { CountriesEnum } from 'common/types';

export const COUNTRY_FLAGS: { [key: number]: string } = {
  [CountriesEnum.AZERBAIJAN]: flag_1_Azerbaijan,
  [CountriesEnum.BELARUS]: flag_2_Belarus,
  [CountriesEnum.KAZAKHSTAN]: flag_3_Kazakhstan,
  [CountriesEnum.KYRGYZSTAN]: flag_4_Kyrgyzstan,
  [CountriesEnum.RUSSIAN]: flag_5_Russian,
  [CountriesEnum.TAJIKISTAN]: flag_6_Tajikistan,
  [CountriesEnum.TURKEY]: flag_7_Turkey,
  [CountriesEnum.UKRAINE]: flag_8_Ukraine,
  [CountriesEnum.UZBEKISTAN]: flag_9_Uzbekistan,
} as const;
