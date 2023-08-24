import React, { FC } from 'react';

import cn from 'classnames';

import style from './FilterButton.module.scss';

interface IFilterButton {
  children: string;
  value: number;
  activeValue: number;
  callback: (value: number) => void;
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
    callback(value);
  };

  return (
    <li className={style.filter_button} onMouseEnter={updateActiveCategory}>
      <button type="button" onMouseEnter={updateActiveCategory} className={buttonClasses}>
        {children}
      </button>
    </li>
  );
};
