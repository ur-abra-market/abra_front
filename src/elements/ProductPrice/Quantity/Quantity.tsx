import { FC } from 'react';

import cn from 'classnames';

import { Button, Paragraph } from 'ui-kit';

import style from './Quantity.module.scss';

interface IQuantityProps {
  count: number;
  setCount: (value: number) => void;
  className?: string;
}

export const Quantity: FC<IQuantityProps> = ({
  count,
  setCount,
  className,
}): JSX.Element => {
  const delta = 100;
  const decrement = (): void => {
    if (count > 0) setCount(count - delta);
  };

  const increment = (): void => {
    if (count < 500) setCount(count + delta);
  };

  return (
    <div className={cn(style.quantity_container, className)}>
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
