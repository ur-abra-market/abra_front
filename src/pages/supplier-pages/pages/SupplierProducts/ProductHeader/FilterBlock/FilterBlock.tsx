import React, { FC, useEffect } from 'react';

import cn from 'classnames';

import { CategoryFilter } from './CategoryFilter/CategoryFilter';
import { SaleFilter } from './SaleFilter/SaleFilter';
import { StatusFilter } from './StatusFilter/StatusFilter';

import { useAppDispatch } from 'common/hooks';
import { getAllCategories } from 'store/reducers/commonSlice';

import style from './FilterBlock.module.scss';

interface IFilterBlock {
  isOpen: boolean;
}

export const FilterBlock: FC<IFilterBlock> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch();

  const filtersClasses = cn({
    [style.filter_container]: true,
    [style.collapsed]: !isOpen,
    [style.expanded]: isOpen,
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className={filtersClasses}>
      <CategoryFilter />
      <SaleFilter />
      <StatusFilter />
    </div>
  );
};
