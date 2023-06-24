import React, { FC } from 'react';

import cn from 'classnames';

import { Container } from '../../../old-components';

import style from './SupplierHeader.module.scss';

import { Top } from '.';

import { IHtmlHeaderProps } from 'common/types';
import { HeaderNav } from 'components/HeaderNav/HeaderNav';

export const SupplierHeader: FC<IHtmlHeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <header className={cn(className)} {...restProps}>
      <Container className={style.container_position}>
        <Top />
        <HeaderNav type="supplier" className={style.nav_container} />
      </Container>
    </header>
  );
};
