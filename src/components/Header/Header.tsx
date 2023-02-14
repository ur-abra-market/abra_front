import React, { FC } from 'react';

import cn from 'classnames';

import HeaderNavMenu from '../HeaderNavMemu';
import { Select } from '../ui-kit';
import { IOption } from '../ui-kit/Select/Select.props';

import style from './Header.module.css';
import { HeaderProps } from './Header.props';
import Top from './Top/Top';

const CURRENCY_DATA: IOption[] = [
  { label: 'English / USD', value: 'usd' },
  { label: 'Russian / RUB', value: 'ru' },
];

const COUNTRY_DATA: IOption[] = [
  { label: 'Turkey', value: 'turkey' },
  { label: 'Belarus', value: 'belarus' },
];

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <header className={cn(className)} {...restProps}>
      <Top />
      <div className={style.wrapper}>
        <div className={style.left}>All categories</div>
        <HeaderNavMenu className={style.center} />
        <div className={style.right}>
          <Select options={CURRENCY_DATA} className={style.select} />
          <div className={style.select_box}>
            <span>Ship to</span>
            <Select options={COUNTRY_DATA} className={style.select} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
