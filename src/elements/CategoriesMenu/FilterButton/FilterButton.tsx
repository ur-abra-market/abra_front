import React, { FC } from 'react';

import cn from 'classnames';

import style from './FilterButton.module.scss';

import { Categories } from 'elements/CategoriesMenu/CategoriesMenu';

interface IFilterButton {
  children: string;
  value: string;
  activeValue: string;
  callback: (value: Categories) => void;
}

export const FilterButton: FC<IFilterButton> = ({
  value,
  activeValue,
  callback,
  children,
}): JSX.Element => {
  const buttonClasses = cn(style.button_categories, {
    [style.active_button]: activeValue === value,
  });

  const updateActiveCategory = (): void => {
    callback(value as Categories);
  };

  return (
    <li className={style.filter_button} onMouseEnter={updateActiveCategory}>
      <button type="button" onMouseEnter={updateActiveCategory} className={buttonClasses}>
        {children}
      </button>
    </li>
  );
};
