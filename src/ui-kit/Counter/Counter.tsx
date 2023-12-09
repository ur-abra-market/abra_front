import { FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './Counter.module.scss';

export interface ICounter {
  className?: string;
  variant?: 'small' | 'big';
  amount: number;
  onIncrementHandler: (value: number) => void;
  onDecrementHandler: (value: number) => void;
}

export const Counter: FC<ICounter> = (props): JSX.Element => {
  const {
    className,
    variant = 'small',
    amount,
    onIncrementHandler,
    onDecrementHandler,
  } = props;

  const incrementClassName = cn(style.increment, {
    [style.increment_big]: variant === 'big',
  });

  const decrementClassName = cn(style.decrement, {
    [style.decrement_big]: variant === 'big',
  });

  const valueClassName = cn(style.value, {
    [style.big_value]: variant === 'big',
  });

  return (
    <div className={cn(style.counter, className)}>
      <button
        type="button"
        className={decrementClassName}
        onClick={() => onIncrementHandler(amount)}
      >
        -
      </button>
      <Paragraph size="s2" className={valueClassName}>
        {amount >= 1 ? amount : 1}
      </Paragraph>
      <button
        type="button"
        className={incrementClassName}
        onClick={() => onDecrementHandler(amount)}
      >
        +
      </button>
    </div>
  );
};
