import { useCallback, useState } from 'react';

import { Discount } from './Discount/Discount';

import { useAppSelector } from 'common/hooks';
import { priseSelector } from 'store/reducers/productSlice';
import { Counter } from 'ui-kit/Counter/Counter';

import style from './ProductPrice.module.scss';

export const ProductPrice = (): JSX.Element => {
  const [count, setCount] = useState<string | number>(0);
  const prices = useAppSelector(priseSelector);

  return (
    <div className={style.product_price_container}>
      <div className={style.wrapper}>
        <Counter
          amount={count as number}
          max_amount={1000}
          onChange={count => setCount(count)}
          min_amount={0}
          label="Quantity"
          bundles_amount="/from 100 bundles"
          variant="large"
          className={style.counter}
        />
        <Discount />
      </div>
    </div>
  );
};
