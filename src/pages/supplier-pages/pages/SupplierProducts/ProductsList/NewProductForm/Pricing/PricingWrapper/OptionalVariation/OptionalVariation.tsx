import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { ColorVariant } from './ColorVariant';
import { DiscountVariant } from './DiscountVariant';

interface IOptionalVariation {
  control: Control;
  discountPrice: number;
  productVariationPrice: number;
  setDiscountPrice: (value: number) => void;
  setInputVariationPrice: (value: number) => void;
}

export const OptionalVariation: FC<IOptionalVariation> = ({
  control,
  discountPrice,
  productVariationPrice,
  setDiscountPrice,
  setInputVariationPrice,
}): JSX.Element => {
  return (
    <>
      <ColorVariant />

      <DiscountVariant
        control={control}
        discountPrice={discountPrice}
        productVariationPrice={productVariationPrice}
        setInputVariationPrice={setInputVariationPrice}
        setDiscountPrice={setDiscountPrice}
      />
    </>
  );
};
