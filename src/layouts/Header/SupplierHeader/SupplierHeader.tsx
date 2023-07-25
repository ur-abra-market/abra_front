import React, { FC } from 'react';

import cn from 'classnames';

import style from './SupplierHeader.module.scss';

import { Top } from './index';

import { IHtmlHeaderProps } from 'common/types';
import { HeaderNav } from 'elements/HeaderNav/HeaderNav';

export const SupplierHeader: FC<IHtmlHeaderProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <header className={cn(style.container, className)} {...restProps}>
      <Top />
      <HeaderNav userRole="supplier" className={style.nav_container} />
    </header>
  );
};
