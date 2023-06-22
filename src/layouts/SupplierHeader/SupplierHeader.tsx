import React, { FC } from 'react';

import cn from 'classnames';

import { Container } from '../../old-components';
import SupplierMenu from '../../old-components/ui/SupplierMenu/SupplierMenu';

import style from './SupplierHeader.module.css';
import { HeaderProps } from './SupplierHeader.props';

import { Top } from '.';

export const Header: FC<HeaderProps> = (props): JSX.Element => {
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
