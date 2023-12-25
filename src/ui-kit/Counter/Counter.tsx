import { ChangeEvent, FC, forwardRef, useState } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './Counter.module.scss';

export interface ICounter {
  variant?: 'small' | 'large';
  label?: string;
  bundles_amount?: string;
  amount: number;
  max_amount: number;
  min_amount?: number;
  onChange: (amount: number | string) => void;
  className?: string;
}

export const Counter: FC<ICounter> = forwardRef<HTMLInputElement, ICounter>(
  (
    {
      variant = 'small',
      label = 'Bundle',
      bundles_amount = 100,
      amount,
      min_amount = 1,
      max_amount,
      onChange,
      className,
      ...restProps
    },
    ref,
  ): JSX.Element => {
    const isDisableDecrement = Number(amount) === min_amount;
    const isDisabledIncrement = Number(amount) === max_amount;

    const [initAmount, setInitAmount] = useState<string | number>(amount);

    const valueClasses = cn(style.value, {
      [style.value_large]: variant === 'large',
    });

    const buttonClasses = cn(style.button, {
      [style.button_large]: variant === 'large',
    });

    const handleIncrementAmount = (amount: number): void => {
      setInitAmount(Number(amount) + 1);
      onChange(Number(amount) + 1);
    };

    const handleDecrementAmount = (amount: number): void => {
      setInitAmount(Number(amount) - 1);
      onChange(Number(amount) - 1);
    };

    const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>): void => {
      const inputValue = parseInt(event.currentTarget.value.trim(), 10);
      const value = String(event.currentTarget.value).replace(/^[.+-]+/g, '');

      if (inputValue <= min_amount) {
        onChange(min_amount);
      } else if (inputValue > max_amount) {
        onChange(max_amount);
      } else {
        onChange(value);
      }
    };

    const handleBlurAmount = (): void => {
      if (!amount) {
        onChange(initAmount);

        return;
      }
      const parsedAmount = Math.floor(Number(String(amount)));
      const validationAmount = String(parsedAmount).replace(/^[0+-]+|[+-]+/g, '');

      if (Number.isNaN(parsedAmount)) {
        onChange(initAmount);
      } else if (parsedAmount < min_amount) {
        onChange(min_amount);
      } else if (parsedAmount > max_amount) {
        onChange(max_amount);
      } else {
        setInitAmount(validationAmount);
        onChange(validationAmount);
      }
    };

    return (
      <div className={cn(style.wrapper, className)}>
        <div className={style.label}>
          <Paragraph className={style.label_title}>
            {label}
            <span className={style.label_bundles}>{bundles_amount}</span>
          </Paragraph>
        </div>
        <div className={style.counter}>
          <button
            type="button"
            className={buttonClasses}
            onClick={() => handleDecrementAmount(amount)}
            disabled={isDisableDecrement}
          >
            -
          </button>
          <input
            type="number"
            pattern="[0-9]*"
            value={amount}
            ref={ref}
            onBlur={handleBlurAmount}
            className={valueClasses}
            onChange={handleChangeAmount}
            min={min_amount}
            max={max_amount}
            {...restProps}
          />
          <button
            type="button"
            className={buttonClasses}
            onClick={() => handleIncrementAmount(amount)}
            disabled={isDisabledIncrement}
          >
            +
          </button>
        </div>
      </div>
    );
  },
);
