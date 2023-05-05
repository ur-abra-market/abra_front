import React, { FC } from 'react';

import cn from 'classnames';

import CustomSelect from '../../Select';
import { OptionType } from '../../Select/Select';
import { Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';

import style from './LocationAndCurrencySelection.module.css';
import { LocationAndCurrencySelectionProps } from './LocationAndCurrencySelection.props';

const CURRENCY_DATA: IOption[] = [
  { label: 'English / USD', value: 'usd' },
  { label: 'Russian / RUB', value: 'ru' },
  { label: 'Ukrainian / RUB', value: 'ua' },
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

  const handleSelectOption = (value: OptionType): void => {
    console.log(value);
  };

  return (
    <div className={cn(style.wrapper, className)}>
      <CustomSelect
        options={CURRENCY_DATA}
        onChange={handleSelectOption}
        menuHeight="200px"
        width="150px"
        placeholder="undefined"
      />
      <div className={style.select_box}>
        <span>Ship to</span>
        <Select options={COUNTRY_DATA} className={style.select} />
      </div>
    </div>
  );
};
