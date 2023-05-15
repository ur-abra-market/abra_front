import React, { FC } from 'react';

import cn from 'classnames';

import { IOption, Select } from '../../ui-kit';

import style from './LocationAndCurrencySelection.module.css';
import { LocationAndCurrencySelectionProps } from './LocationAndCurrencySelection.props';

const CURRENCY_DATA: IOption[] = [
  { label: 'Russian / RUB', value: 'ru' },
  { label: 'English / USD', value: 'usd' },
];

const COUNTRY_DATA: IOption[] = [
  { label: 'Turkey', value: 'turkey' },
  { label: 'Belarus', value: 'belarus' },
];

export const LocationAndCurrencySelection: FC<
  LocationAndCurrencySelectionProps
> = props => {
  const { className } = props;

  return (
    <div className={cn(style.wrapper, className)}>
      <Select options={CURRENCY_DATA} width="150px" header />
      <div className={style.select_box}>
        <span>Ship to</span>
        <Select options={COUNTRY_DATA} header width="120px" />
      </div>
    </div>
  );
};
