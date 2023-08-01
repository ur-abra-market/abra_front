import React, { FC } from 'react';

import cn from 'classnames';

import style from './LocationAndCurrencySelection.module.scss';
import { LocationAndCurrencySelectionProps } from './LocationAndCurrencySelection.props';

import { CountriesEnum } from 'common/types';
import { COUNTRY_FLAGS } from 'common/utils';
import { ISelectOption, Select } from 'ui-kit';

const CURRENCY_DATA: ISelectOption[] = [
  { label: { text: 'Russian / RUB' }, value: 'ru' },
  { label: { text: 'English / USD' }, value: 'usd' },
];

const COUNTRY_DATA: ISelectOption[] = [
  {
    label: { text: 'Russia', image_src: COUNTRY_FLAGS[CountriesEnum.RUSSIAN] },
    value: CountriesEnum.RUSSIAN,
  },
  {
    label: { text: 'Turkey', image_src: COUNTRY_FLAGS[CountriesEnum.TURKEY] },
    value: CountriesEnum.TURKEY,
  },
  {
    label: { text: 'Belarus', image_src: COUNTRY_FLAGS[CountriesEnum.BELARUS] },
    value: CountriesEnum.BELARUS,
  },
];

export const LocationAndCurrencySelection: FC<
  LocationAndCurrencySelectionProps
> = props => {
  const { className, dropOnUp = false } = props;

  return (
    <div className={cn(style.wrapper, className)}>
      <Select
        dropOnUp={dropOnUp}
        options={CURRENCY_DATA}
        width="172px"
        header
        className={style.select}
      />
      <div className={style.select_box}>
        <span>Ship to</span>
        <Select
          dropOnUp={dropOnUp}
          options={COUNTRY_DATA}
          header
          width="150px"
          className={style.select}
        />
      </div>
    </div>
  );
};
