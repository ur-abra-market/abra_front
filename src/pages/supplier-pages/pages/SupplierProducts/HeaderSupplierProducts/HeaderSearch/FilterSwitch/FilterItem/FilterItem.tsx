import React, { FC } from 'react';

import style from './FilterItem.module.scss';

import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/HeaderSearch/HeaderSearch';

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

  const styleIconClass = restFilters ? style.vector_down : style.vector_up;

  return (
    <>
      <span
        role="presentation"
        className={style.rest_filters}
        onClick={handleRestFiltersSet}
      >
        {text}
      </span>
      <Icon onClick={handleRestFiltersSet} className={styleIconClass} />
      {restFilters && <div className={style.reset_link}>Reset Filters</div>}
    </>
  );
};
