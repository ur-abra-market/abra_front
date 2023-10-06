import React, { FC } from 'react';

import cn from 'classnames';

import { CategoryFilter } from './CategoryFilter/CategoryFilter';
import { SaleFilter } from './SaleFilter/SaleFilter';
import { StatusFilter } from './StatusFilter/StatusFilter';

import style from './FilterBlock.module.scss';

interface IFilterBlock {
  isOpen: boolean;
}

export const FilterBlock: FC<IFilterBlock> = ({ isOpen }): JSX.Element => {
  const filtersClasses = cn({
    [style.filter_container]: true,
    [style.collapsed]: !isOpen,
    [style.expanded]: isOpen,
  });

  return (
    <div className={filtersClasses}>
      <CategoryFilter />
      <SaleFilter />
      <StatusFilter />
    </div>
  );
};
