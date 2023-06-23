import React, { FC } from 'react';

import cn from 'classnames';

import { Container } from '../../old-components';
import SupplierMenu from '../../old-components/ui/SupplierMenu/SupplierMenu';

import style from './SupplierHeader.module.scss';

import { Top } from '.';

import { IHtmlHeaderProps } from 'common/types';

export const Header: FC<IHtmlHeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <header className={cn(className)} {...restProps}>
      <Container className={style.container_position}>
        <Top />
        <SupplierMenu />
      </Container>
    </header>
  );
};
