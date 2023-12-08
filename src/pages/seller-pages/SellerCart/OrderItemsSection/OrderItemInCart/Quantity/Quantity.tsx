import React, { FC } from 'react';

import { QuantityCounter } from './QuantityCounter';

import { QuestionDisabled } from 'assets/icons';
import { Paragraph } from 'ui-kit';

import style from './Quantity.module.scss';

export interface IQuantity {
  amount: number;
}

export const Quantity: FC<IQuantity> = ({ amount }): JSX.Element => {
  return (
    <div className={style.quantity}>
      <div className={style.bundle_quantity}>
        <Paragraph size="s2" className={style.bundle_quantity_text}>
          Bundle
          <span className={style.bundle_quantity_value}>/from {100} pcs</span>
        </Paragraph>
        <button
          type="button"
          aria-label="button question"
          className={style.bundles_question_button}
        >
          <QuestionDisabled />
        </button>
      </div>
      <QuantityCounter amount={amount} />
    </div>
  );
};
