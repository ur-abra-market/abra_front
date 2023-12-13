import { FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './Counter.module.scss';

export interface ICounter {
  className?: string;
  variant?: 'small' | 'large';
  amount: number;
  onIncrementHandler: (value: number) => void;
  onDecrementHandler: (value: number) => void;
}

export const Counter: FC<ICounter> = ({
  className,
  variant = 'small',
  amount,
  onIncrementHandler,
  onDecrementHandler,
}): JSX.Element => {
  const incrementClasses = cn(style.increment, {
    [style.increment_large]: variant === 'large',
  });

  const decrementClasses = cn(style.decrement, {
    [style.decrement_large]: variant === 'large',
  });

  const valueClasses = cn(style.value, {
    [style.value_large]: variant === 'large',
  });

  return (
    <div className={cn(style.counter, className)}>
      <button
        type="button"
        className={decrementClasses}
        onClick={() => onIncrementHandler(amount)}
      >
        -
      </button>
      <Paragraph size="s2" className={valueClasses}>
        {amount >= 1 ? amount : 1}
      </Paragraph>
      <button
        type="button"
        className={incrementClasses}
        onClick={() => onDecrementHandler(amount)}
      >
        +
      </button>
    </div>
  );
};
