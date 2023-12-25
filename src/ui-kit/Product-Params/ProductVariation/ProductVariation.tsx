import React, { FC } from 'react';

import style from './ProductVariation.module.scss';

interface ProductVariationProps {
  color: string;
  backgroundColor: string;
  optionNumber: number;
}
export const ProductVariation: FC<ProductVariationProps> = ({
  optionNumber,
  color,
  backgroundColor,
}): JSX.Element => {
  return (
    <button
      type="button"
      className={style.container}
      style={{ '--backgroundColor': backgroundColor } as React.CSSProperties}
    >
      <div className={style.box} style={{ backgroundColor: color }} />
      <div>Var. {optionNumber}</div>
    </button>
  );
};
