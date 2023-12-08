import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './QuantityCounter.module.scss';

export interface IQuantityCounter {
  amount: number;
}

export const QuantityCounter: FC<IQuantityCounter> = ({ amount }): JSX.Element => {
  return (
    <div className={style.quantity_counter}>
      <button type="button" className={style.quantity_decrement}>
        -
      </button>
      <Paragraph size="s2" className={style.quantity_value}>
        {amount}
      </Paragraph>
      <button type="button" className={style.quantity_increment}>
        +
      </button>
    </div>
  );
};
