import React, { FC } from 'react';

import cn from 'classnames';

import style from './Header.module.scss';

import { Top } from '.';

import { IHtmlProps } from 'common/types';
import { LocationAndCurrencySelection } from 'elements/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderCategories, HeaderNav } from 'layouts/Header/components';

export const Header: FC<IHtmlProps> = ({ className, ...restProps }): JSX.Element => {
  return (
    <header className={cn(style.container, className)} {...restProps}>
      <Top />

      <div className={style.wrapper}>
        <HeaderCategories wrapperClassName={style.categories} />
        <HeaderNav
          userRole="seller"
          wrapperClassName={style.nav_wrapper}
          className={style.nav_content}
        />
        <LocationAndCurrencySelection wrapperClassName={style.selected_wrapper} />
      </div>
    </header>
  );
};
