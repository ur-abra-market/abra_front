import React, { FC } from 'react';

import cn from 'classnames';

import style from './LocationAndCurrencySelection.module.scss';
import { LocationAndCurrencySelectionProps } from './LocationAndCurrencySelection.props';

import { ISelectOption, Select } from 'ui-kit';

const CURRENCY_DATA: ISelectOption[] = [
  { label: { text: 'Russian / RUB' }, value: 'ru' },
  { label: { text: 'English / USD' }, value: 'usd' },
];

const COUNTRY_DATA: ISelectOption[] = [
  { label: { text: 'Russia' }, value: 'russia' },
  { label: { text: 'Turkey' }, value: 'turkey' },
  { label: { text: 'Belarus' }, value: 'belarus' },
];

export const LocationAndCurrencySelection: FC<
  LocationAndCurrencySelectionProps
> = props => {
  const { className } = props;

  return (
    <div className={cn(style.wrapper, className)}>
      <Select options={CURRENCY_DATA} width="172px" header className={style.select} />
      <div className={style.select_box}>
        <span>Ship to</span>
        <Select options={COUNTRY_DATA} header width="150px" className={style.select} />
      </div>
    </div>
  );
};
