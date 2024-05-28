import { ChangeEvent, FC, forwardRef, useState, KeyboardEvent } from 'react';

import cn from 'classnames';

import { QuestionIcon } from 'assets/icons';
import { KEYBOARD_KEYS } from 'common/constants';
import { Button } from 'ui-kit/buttons/Button/Button';
import { ButtonIcon } from 'ui-kit/buttons/ButtonIcon/ButtonIcon';
import { Input } from 'ui-kit/Input/Input';
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
  withQuestionIcon?: boolean;
}

export const Counter: FC<ICounter> = forwardRef<HTMLInputElement, ICounter>(
  (
    {
      variant = 'small',
      label = 'Bundle',
      bundles_amount,
      amount,
      min_amount = 1,
      max_amount,
      onChange,
      className,
      withQuestionIcon = false,
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

    const handleIncrementAmount = (): void => {
      setInitAmount(Number(amount) + 1);
      onChange(Number(amount) + 1);
    };

    const handleDecrementAmount = (): void => {
      setInitAmount(Number(amount) - 1);
      onChange(Number(amount) - 1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.code === KEYBOARD_KEYS.ARROW_UP) {
        handleIncrementAmount();
      }
      if (e.code === KEYBOARD_KEYS.ARROW_DOWN) {
        handleDecrementAmount();
      }
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
          {withQuestionIcon && (
            <ButtonIcon aria-label="button-question" className={style.button_question}>
              <QuestionIcon />
            </ButtonIcon>
          )}
        </div>
        <div className={style.counter}>
          <Button
            onClick={handleDecrementAmount}
            disabled={isDisableDecrement}
            className={buttonClasses}
          >
            -
          </Button>
          <Input
            type="number"
            pattern="[0-9]*"
            value={amount}
            ref={ref}
            onBlur={handleBlurAmount}
            className={valueClasses}
            onChange={handleChangeAmount}
            min={min_amount}
            max={max_amount}
            classNameWrapper={style.wrapper_input}
            onKeyDown={handleKeyDown}
            {...restProps}
          />
          <Button
            onClick={handleIncrementAmount}
            disabled={isDisabledIncrement}
            className={buttonClasses}
          >
            +
          </Button>
        </div>
      </div>
    );
  },
);
