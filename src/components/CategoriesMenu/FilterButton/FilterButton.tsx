import React, { FC } from 'react';

import cn from 'classnames';

import { Categories } from '../CategoriesMenu';

import style from './FilterButton.module.css';

interface FilterButtonProps {
  children: string;
  value: string;
  activeValue: string;
  callback: (value: Categories) => void;
}

export const FilterButton: FC<FilterButtonProps> = ({
  value,
  activeValue,
  callback,
  children,
}): JSX.Element => {
  const onClick = (): void => {
    callback(value as Categories);
  };

  return (
    <li className={style.filter_button}>
      <button
        type="button"
        onMouseEnter={onClick}
        className={cn({
          [style.active_button]: activeValue === value,
        })}
      >
        {children}
      </button>
    </li>
  );
};
