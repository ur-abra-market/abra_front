import React, { FC } from 'react';

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
    <div className={style.container} style={{ '--color': color } as React.CSSProperties}>
      <div className={style.box} style={{ backgroundColor: color }} />
      <div>Var. {optionNumber}</div>
    </div>
  );
};
