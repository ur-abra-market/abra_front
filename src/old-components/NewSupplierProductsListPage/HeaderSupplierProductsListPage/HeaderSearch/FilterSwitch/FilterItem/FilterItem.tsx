import React, { FC } from 'react';

import style from './FilterItem.module.scss';

import { IHeaderSearch } from 'old-components/NewSupplierProductsListPage/HeaderSupplierProductsListPage/HeaderSearch/HeaderSearch';

interface ItemProps extends IHeaderSearch {
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const FilterItem: FC<ItemProps> = ({
  setRestFilters,
  restFilters,
  Icon,
  text,
}): JSX.Element => {
  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  return (
    <>
      <span
        role="presentation"
        className={style.rest_filters}
        onClick={handleRestFiltersSet}
      >
        {text}
      </span>
      <Icon onClick={handleRestFiltersSet} className={style.vector_up} />
      {restFilters && <div className={style.reset_link}>Reset Filters</div>}
    </>
  );
};
