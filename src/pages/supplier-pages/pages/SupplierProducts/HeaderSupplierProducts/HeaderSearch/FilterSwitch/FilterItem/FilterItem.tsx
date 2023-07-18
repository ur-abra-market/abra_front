import React, { FC } from 'react';

import style from './FilterItem.module.scss';

import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/HeaderSearch/HeaderSearch';

export interface ItemProps extends IHeaderSearch {
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

  const styleIconClass = restFilters ? style.vector_down : style.vector_up;

  return (
    <>
      <button className={style.rest_filters} type="button" onClick={handleRestFiltersSet}>
        {text}
      </button>
      <Icon onClick={handleRestFiltersSet} className={styleIconClass} />
      {restFilters && <div className={style.reset_link}>Reset Filters</div>}
    </>
  );
};
