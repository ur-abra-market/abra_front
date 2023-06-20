import React, { FC } from 'react';

import cn from 'classnames';

import { Categories } from '../CategoriesMenu';

import style from './FilterButton.module.css';

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
  const updateActiveCategory = (): void => {
    callback(value as Categories);
  };

  return (
    <li className={style.filter_button} onMouseEnter={updateActiveCategory}>
      <button
        type="button"
        onMouseEnter={updateActiveCategory}
        className={cn(style.button_categories, {
          [style.active_button]: activeValue === value,
        })}
      >
        {children}
      </button>
    </li>
  );
};
