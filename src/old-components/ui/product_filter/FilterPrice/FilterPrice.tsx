import React from 'react';

import style from './FilterPrice.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { priceFrom, priceTo } from 'store/reducers/filterSlice';
import { Checkbox } from 'ui-kit';

const FilterPrice = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  // const paginate = useAppSelector(state => state.paginate);
  // const data = { ...paginate, ...filter };

  const handlerPriceFrom = (value: string): void => {
    dispatch(priceFrom(+value));
    // dispatch(productPaginateService(data));
  };

  const handlerPriceTo = (value: string): void => {
    dispatch(priceTo(+value));
    // dispatch(productPaginateService(data));
  };

  return (
    <div className={style.filter_price}>
      <h4>Price, $</h4>
      <div className={style.filter_price_range}>
        <div className={style.filter_price_range_from}>
          <div className={style.filter_price_range_from_text}>From</div>
          <input
            className={style.filter_price_range_from_input}
            type="number"
            value={filter.price_from}
            onChange={e => handlerPriceFrom(e.target.value)}
          />
        </div>
        <div className={style.filter_price_range_to}>
          <div className={style.filter_price_range_to_text}>Up To</div>
          <input
            className={style.filter_price_range_to_input}
            type="number"
            value={filter.price_to}
            onChange={e => handlerPriceTo(e.target.value)}
          />
        </div>
      </div>
      <Checkbox
        variant="default"
        label="Only discounted items"
        className={style.filter_price_checkbox}
      />
      {/* <SwitchBox label="Only discounted items" /> */}
      {/* <SwitchDiscount /> */}
    </div>
  );
};

export default FilterPrice;
