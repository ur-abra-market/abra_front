import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import style from './Header.module.scss';

import { Top } from '.';

import { IHtmlHeaderProps } from 'common/types';
import { CategoriesMenu } from 'elements/CategoriesMenu/CategoriesMenu';
import { LocationAndCurrencySelection } from 'elements/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderNav } from 'layouts/Header/components';

export const Header: FC<IHtmlHeaderProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  const categoriesRef = useRef() as RefObject<HTMLDivElement>;
  const buttonRef = useRef() as RefObject<HTMLButtonElement>;
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

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
    <header className={cn(style.container, className)} {...restProps}>
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
        <HeaderNav userRole="seller" className={style.nav_container} />
        <LocationAndCurrencySelection className={style.selected} />
      </div>

      {categoriesIsOpen && (
        <CategoriesMenu ref={categoriesRef} onClose={setCategoriesIsOpen} />
      )}
    </header>
  );
};
