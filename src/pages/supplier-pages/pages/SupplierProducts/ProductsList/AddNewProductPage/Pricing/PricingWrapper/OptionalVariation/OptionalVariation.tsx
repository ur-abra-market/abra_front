import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { ColorVariant } from './ColorVariant';
import { DiscountVariant } from './DiscountVariant';

interface IOptionalVariation {
  control: Control;
  discountPrice: number;
  setDiscountPrice: (value: number) => void;
  setSelectMarkup: (value: string) => void;
}

export const OptionalVariation: FC<IOptionalVariation> = ({
  control,
  discountPrice,
  setDiscountPrice,
  setSelectMarkup,
}): JSX.Element => {
  return (
    <>
      <ColorVariant />
      <DiscountVariant
        control={control}
        discountPrice={discountPrice}
        setDiscountPrice={setDiscountPrice}
        setSelectMarkup={setSelectMarkup}
      />
    </>
  );
};
