import React, { FC } from 'react';

import cn from 'classnames';

import style from './SupplierHeader.module.scss';

import { Top } from '.';

import { IHtmlProps, UserRoleEnum } from 'common/types';
import { HeaderNav } from 'layouts/Header/components';

export const SupplierHeader: FC<IHtmlProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <header className={cn(style.container, className)} {...restProps}>
      <Top />
      <div className={style.wrapper}>
        <HeaderNav
          userRole={UserRoleEnum.SUPPLIER}
          wrapperClassName={style.nav_wrapper}
          className={style.nav_container}
        />
      </div>
    </header>
  );
};
