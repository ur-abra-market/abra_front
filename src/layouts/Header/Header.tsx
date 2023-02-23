import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { Container } from '../../components';
import HeaderNavMenu from '../../components/HeaderNavMemu';
import { CategoriesMenu } from '../../components/new-components/CategoriesMenu/CategoriesMenu';
import { LocationAndCurrencySelection } from '../../components/new-components/LocationAndCurrencySelection/LocationAndCurrencySelection';

import style from './Header.module.css';
import { HeaderProps } from './Header.props';
import Top from './Top/Top';

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

  const categoriesRef = useRef() as RefObject<HTMLDivElement>;
  const buttonRef = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    const handler = (e: Event): void => {
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
      <Container className={style.container_position}>
        <Top />
        <div className={style.wrapper}>
          <button
            type="button"
            ref={buttonRef}
            className={style.left}
            onClick={() => setCategoriesIsOpen(!categoriesIsOpen)}
          >
            All categories
          </button>
          <HeaderNavMenu className={style.center} />
          <LocationAndCurrencySelection className={style.right} />
        </div>
        {categoriesIsOpen && <CategoriesMenu ref={categoriesRef} />}
      </Container>
    </header>
  );
};

export default Header;
