import React, { FC } from 'react';

import style from './FilterItem.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/HeaderSearch/HeaderSearch';
import { getParamsSelector, setParams } from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

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
  const dispatch = useAppDispatch();
  const params = useAppSelector(getParamsSelector);
  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  const onResetFiltersHandler = (): void => {
    dispatch(
      setParams({
        ...params,
        categoryId: 0,
        ascending: true,
        isActive: true,
        onSale: true,
        sort: 'date',
      }),
    );
  };

  const styleIconClass = restFilters ? style.vector_down : style.vector_up;

  return (
    <>
      <button className={style.rest_filters} type="button" onClick={handleRestFiltersSet}>
        {text}
      </button>
      <Icon onClick={handleRestFiltersSet} className={styleIconClass} />
      {restFilters && (
        <ButtonIcon onClick={onResetFiltersHandler} className={style.reset_link}>
          Reset Filters
        </ButtonIcon>
      )}
    </>
  );
};
