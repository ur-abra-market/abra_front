import React, { FC } from 'react';

import cn from 'classnames';

import style from './MobileSupplierHeader.module.scss';

import { IHtmlProps, UserRoleEnum } from 'common/types';
import { HeaderNav } from 'layouts/Header/components';
import { Top } from 'layouts/Header/SupplierHeader';

export const MobileSupplierHeader: FC<IHtmlProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <Top isMobileView />
      <div className={style.center_container}>
        <HeaderNav userRole={UserRoleEnum.SUPPLIER} isMobileView />
      </div>
    </div>
  );
};
