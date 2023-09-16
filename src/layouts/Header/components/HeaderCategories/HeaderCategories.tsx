import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import style from './HeaderCategories.module.scss';

import { IHtmlProps } from 'common/types';
import { CategoriesMenu } from 'elements/CategoriesMenu/CategoriesMenu';

interface IHeaderCategories extends IHtmlProps {
  wrapperClassName?: string;
}

export const HeaderCategories: FC<IHeaderCategories> = ({
  wrapperClassName,
}): JSX.Element => {
  const categoriesRef = useRef() as RefObject<HTMLDivElement>;
  const buttonRef = useRef() as RefObject<HTMLButtonElement>;
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

  useEffect(() => {
    const listner = (e: Event): void => {
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

    document.addEventListener('mousedown', listner);

    return () => {
      document.removeEventListener('mousedown', listner);
    };
  });

  const handleSetFocusCategory = (): void => {
    buttonRef.current?.focus();
  };

  return (
    <div className={cn(style.wrapper, wrapperClassName)}>
      <button
        type="button"
        ref={buttonRef}
        className={style.button}
        onClick={() => setCategoriesIsOpen(!categoriesIsOpen)}
      >
        <p className={style.button}> All categories</p>
      </button>

      {categoriesIsOpen && (
        <CategoriesMenu
          ref={categoriesRef}
          onClose={setCategoriesIsOpen}
          handleFocus={handleSetFocusCategory}
        />
      )}
    </div>
  );
};
