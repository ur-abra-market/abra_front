import React, { FC } from 'react';

import cn from 'classnames';

import HeaderNavMenu from '../HeaderNavMemu';
import { LocationAndCurrencySelection } from '../new-components/LocationAndCurrencySelection/LocationAndCurrencySelection';

import style from './Header.module.css';
import { HeaderProps } from './Header.props';
import Top from './Top/Top';

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <header className={cn(className)} {...restProps}>
      <Top />
      <div className={style.wrapper}>
        <div className={style.left}>All categories</div>
        <HeaderNavMenu className={style.center} />
        <LocationAndCurrencySelection className={style.right} />
      </div>
    </header>
  );
};

export default Header;
