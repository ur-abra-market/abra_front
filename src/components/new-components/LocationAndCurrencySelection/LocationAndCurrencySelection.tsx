import React, { FC } from 'react';

import cn from 'classnames';

import CustomSelect from '../../Select';
import { Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';

import style from './LocationAndCurrencySelection.module.css';
import { LocationAndCurrencySelectionProps } from './LocationAndCurrencySelection.props';

const CURRENCY_DATA: IOption[] = [
  { label: 'English / USD', value: 'usd' },
  { label: 'Russian / RUB', value: 'ru' },
  { label: 'Ukrainedddddddddddd / RUB', value: 'ua' },
  { label: 'Poland / RUB', value: 'pl' },
  { label: 'Latvia / RUB', value: 'lv' },
];

const COUNTRY_DATA: IOption[] = [
  { label: 'Turkey', value: 'turkey' },
  { label: 'Belarus', value: 'belarus' },
];

export const LocationAndCurrencySelection: FC<
  LocationAndCurrencySelectionProps
> = props => {
  const { className } = props;

  const handleSelectOption = (): void => {};

  return (
    <div className={cn(style.wrapper, className)}>
      {/* <Select options={CURRENCY_DATA} className={style.select} /> */}
      <CustomSelect options={CURRENCY_DATA} onChange={handleSelectOption} />
      <div className={style.select_box}>
        <span>Ship to</span>
        <Select
          options={COUNTRY_DATA}
          className={style.select}
          error="tesd"
          placeholder="test"
        />
      </div>
    </div>
  );
};
