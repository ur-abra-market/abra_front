import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './QuantityCounter.module.scss';

export const QuantityCounter: FC<any> = ({ item }): JSX.Element => {
  return (
    <div className={style.quantity_counter}>
      <button type="button" className={style.quantity_decrement}>
        -
      </button>
      <Paragraph size="s2" className={style.quantity_value}>
        {item.amount}
      </Paragraph>
      <button type="button" className={style.quantity_increment}>
        +
      </button>
    </div>
  );
};
