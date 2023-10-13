import { useCallback, useState } from 'react';

import { Discount } from './Discount/Discount';
import { Quantity } from './Quantity/Quantity';
import { Stats } from './Stats/Stats';

import { useAppSelector } from 'common/hooks';
import { priseSelector } from 'store/reducers/productSlice';

import style from './ProductPrice.module.scss';

export const ProductPrice = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const price = useAppSelector(priseSelector);

  const onChangeCount = useCallback((value: number): void => {
    setCount(value);
  }, []);

  return (
    <div>
      <div className={style.block_wrapper}>
        <div className={style.group_container}>
          <Quantity count={count} setCount={onChangeCount} />
          <Discount price={price} />
        </div>
        <Stats price={price} />
      </div>
    </div>
  );
};
