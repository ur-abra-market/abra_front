import React, { FC, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { Container } from '../../components';
import HeaderNavMenu from '../../components/HeaderNavMemu';
import { LocationAndCurrencySelection } from '../../components/new-components/LocationAndCurrencySelection/LocationAndCurrencySelection';

import style from './Header.module.css';
import { HeaderProps } from './Header.props';
import Top from './Top/Top';
import { CategoriesMenu } from '../../components/new-components/CategoriesMenu/CategoriesMenu';

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

  const categoriesRef = useRef() as CategoriesMenuRefType;
  const buttonRef = useRef() as CategoriesMenuRefType;

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as Element;
      if (
        categoriesRef.current &&
        categoriesIsOpen &&
        target !== buttonRef.current &&
        !categoriesRef.current.contains(target)
      ) {
        setCategoriesIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <header className={cn(className)} {...restProps}>
      <Container>
        <Top />
        <div className={style.wrapper} ref={categoriesRef}>
          <div
            ref={buttonRef}
            className={style.left}
            onClick={() => setCategoriesIsOpen(!categoriesIsOpen)}>
            All categories
          </div>
          <HeaderNavMenu className={style.center} />
          <LocationAndCurrencySelection className={style.right} />
        </div>
        {categoriesIsOpen && <CategoriesMenu ref={categoriesRef} />}
      </Container>
    </header>
  );
};

export default Header;

export type CategoriesMenuRefType = React.MutableRefObject<HTMLInputElement>;
