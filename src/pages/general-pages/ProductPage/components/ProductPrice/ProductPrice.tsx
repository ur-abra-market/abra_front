import { Discount } from './Discount/Discount';

import { useAppSelector } from 'common/hooks';
import { Counter } from 'ui-kit/Counter/Counter';

import style from './ProductPrice.module.scss';

export interface IProductPrice {
  count: number | string;
  setCount: (value: number | string) => void;
}

export const ProductPrice = ({ count, setCount }: IProductPrice): JSX.Element => {
  const { prices } = useAppSelector(state => state.product.selectedBundle.bundle);

  return (
    <div className={style.product_price_container}>
      <div className={style.wrapper}>
        <Counter
          amount={count as number}
          max_amount={1000} // откуда брать МАксимальное значение?
          onChange={count => setCount(count)}
          min_amount={0}
          label="Quantity"
          bundles_amount={`/from ${prices[0].min_quantity} bundles`} // откуда брать МИнимальное значение?
          variant="large"
          className={style.counter}
        />
        <Discount prices={prices} />
      </div>
    </div>
  );
};
