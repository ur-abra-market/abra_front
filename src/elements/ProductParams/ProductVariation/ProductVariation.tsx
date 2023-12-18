import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './ProductVariation.module.scss';

interface ProductVariationProps {
  color: string;
  optionNumber: number;
}
export const ProductVariation: FC<ProductVariationProps> = ({
  optionNumber,
  color,
}): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.box} style={{ backgroundColor: color }} />
      <Paragraph>Var.</Paragraph>
      {optionNumber}
    </div>
  );
};
