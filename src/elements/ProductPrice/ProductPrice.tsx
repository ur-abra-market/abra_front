import { useCallback, useState } from 'react';

import cn from 'classnames';

import { Discount } from './Discount/Discount';
import { Quantity } from './Quantity/Quantity';
import { Stats } from './Stats/Stats';

import { useAppSelector } from 'common/hooks';
import { priseSelector } from 'store/reducers/productSlice';
import { Title } from 'ui-kit';

import style from './ProductPrice.module.scss';

export const ProductPrice = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const price = useAppSelector(priseSelector);

  const onChangeCount = useCallback((value: number): void => {
    setCount(value);
  }, []);

  return (
    <div className={style.product_price_container}>
      <div className={style.grid_item}>
        <Quantity count={count} setCount={onChangeCount} />
        <Discount price={price} />
      </div>

      <Stats className={style.grid_item} price={price} />

      <Title className={cn(style.title, style.grid_item)} size="xs">
        <span className={style.total_price}>Total:</span>
        {`$${((count || 1) * price).toFixed(1)}`}
      </Title>
    </div>
  );
};
