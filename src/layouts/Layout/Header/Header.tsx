import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { CategoriesMenu } from '../../../components/CategoriesMenu/CategoriesMenu';
import { LocationAndCurrencySelection } from '../../../components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { Container } from '../../../ui-kit';

import style from './Header.module.scss';

import { Top } from '.';

import { IHtmlHeaderProps } from 'common/types';
import { HeaderNav } from 'components/HeaderNav/HeaderNav';

export const Header: FC<IHtmlHeaderProps> = ({
  className,
  ...restProps
}): JSX.Element => {
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
            className={style.button}
            onClick={() => setCategoriesIsOpen(!categoriesIsOpen)}
          >
            All categories
          </button>
          <HeaderNav type="seller" className={style.nav_container} />
          <LocationAndCurrencySelection className={style.selected} />
        </div>
        {categoriesIsOpen && <CategoriesMenu ref={categoriesRef} />}
      </Container>
    </header>
  );
};
