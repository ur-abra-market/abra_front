import { FC } from 'react';

import { Button, Paragraph } from 'ui-kit';

import style from './Quantity.module.scss';

interface IQuantityProps {
  count: number;
  setCount: (value: number) => void;
}

export const Quantity: FC<IQuantityProps> = ({ count, setCount }): JSX.Element => {
  const delta = 100;
  const decrement = (): void => {
    if (count > 0) setCount(count - delta);
  };

  const increment = (): void => {
    if (count < 500) setCount(count + delta);
  };

  return (
    <div className={style.quantity_container}>
      <Paragraph size="s">
        Quantity <span className={style.text}>/from 100 bundles</span>
      </Paragraph>
      <div className={style.counter_container}>
        <Button className={style.button} onClick={decrement}>
          -
        </Button>
        <div className={style.counter}>{count}</div>
        <Button className={style.button} onClick={increment}>
          +
        </Button>
      </div>
    </div>
  );
};
