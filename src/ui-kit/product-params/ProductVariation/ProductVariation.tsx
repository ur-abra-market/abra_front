import React, { FC } from 'react';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './ProductVariation.module.scss';

interface IProductVariation {
  color: string;
  optionNumber: number;
}
export const ProductVariation: FC<IProductVariation> = ({
  optionNumber,
  color,
}): JSX.Element => {
  return (
    <button type="button" className={style.container}>
      <div className={style.box} style={{ backgroundColor: color }} />
      <Paragraph weight="medium">Var. {optionNumber}</Paragraph>
    </button>
  );
};
