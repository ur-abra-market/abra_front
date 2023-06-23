import React, { FC } from 'react';

import cn from 'classnames';

import { Categories } from '../CategoriesMenu';

import style from './FilterButton.module.scss';

interface FilterButtonProps<T> {
  children: string;
  value: T;
  activeValue: T;
  callback: (value: T) => void;
}

export const FilterButton: FC<FilterButtonProps<Categories>> = ({
  value,
  activeValue,
  callback,
  children,
}): JSX.Element => {
  return (
    <li className={style.filter_button}>
      <button
        type="button"
        onClick={() => callback(value)}
        className={cn({
          [style.active_button]: activeValue === value,
        })}
      >
        {children}
      </button>
    </li>
  );
};
