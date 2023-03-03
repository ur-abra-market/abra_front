import React from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import {
  ascending,
  brand,
  category,
  discount,
  material,
  priceFrom,
  priceTo,
  size,
  sort,
} from '../../../../store/reducers/filterSlice';
import { activeNum } from '../../../../store/reducers/productPaginateSlice';
import SelectFilter from '../SelectFilter';

import style from './FilterSort.module.css';

const FilterSort = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handlerReset = (): void => {
    dispatch(category(''));
    dispatch(sort('rating'));
    dispatch(priceFrom(0));
    dispatch(priceTo(0));
    dispatch(discount(false));
    dispatch(brand([]));
    dispatch(material([]));
    dispatch(size([]));
    dispatch(ascending(false));
    dispatch(activeNum(1));
  };

  return (
    <div className={style.silterSort}>
      <div className={style.silterSort__title}>
        <h4>Filters</h4>
        <span className="FilterSort__reset" onClick={handlerReset}>
          Reset All
        </span>
      </div>
      <SelectFilter typeSelect="sort" />
      <SelectFilter typeSelect="category" />
    </div>
  );
};

export default FilterSort;
