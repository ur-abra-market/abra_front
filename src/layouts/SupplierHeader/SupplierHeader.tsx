import React, { FC } from 'react';

import cn from 'classnames';

import SupplierMenu from '../../old-components/ui/SupplierMenu/SupplierMenu';
import { Container } from '../../ui-kit';

import style from './SupplierHeader.module.scss';
import { HeaderProps } from './SupplierHeader.props';
import Top from './SupplierTop/SupplierTop';

const Header: FC<HeaderProps> = (props): JSX.Element => {
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

export default Header;
