import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { brand } from '../../../../store/reducers/filterSlice';
import SearchFilter from '../SearchFilter';
import './FilterBrand.module.css';

const FilterBrand = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(state => state.filter.brands);
  const brandList = ['Mavi', 'Kotton', 'LC Waikiki', 'Colin’s', 'DeFacto', 'Ipekyol'];
  // @ts-ignore
  const len = brandList.map(b => brands.includes(b.toLowerCase())).filter(e => !e);

  const changeState = (ctx: any) => {
    const arrCheck = brandList
      // @ts-ignore
      .map(b => brands.includes(b.toLowerCase()))
      .map((e, i) => (brandList[i] === ctx ? !e : e));
    const brandArr = brandList.filter((_, i) => arrCheck[i]).map(b => b.toLowerCase());

    dispatch(brand(brandArr));
  };

  return (
    <div className="FilterBrand">
      <h4 className="FilterBrand__title">Brand</h4>
      <SearchFilter typeSearch="brand" />
      <div
        className="FilterBrand__btns"
        // @ts-ignore
        style={{ gap: len < brandList.length ? '24px' : '0px' }}
      >
        <div className="FilterBrand__list">
          {brandList
            // @ts-ignore
            .filter(b => brands.includes(b.toLowerCase()))
            .map(b => (
              <div
                className="FilterBrand__list_item filter-item_active"
                style={{ background: '#000000', color: '#ffffff' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
        <div className={len ? 'FilterBrand__list' : 'none'}>
          {brandList
            // @ts-ignore
            .filter(b => !brands.includes(b.toLowerCase()))
            .map(b => (
              <div
                className="FilterBrand__list_item"
                style={{ background: '#e5e5e5', color: '#000000' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBrand;
