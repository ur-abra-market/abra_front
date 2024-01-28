import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { CommonInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Pricing/CommonInputPrice';
import { Label } from 'ui-kit';

import style from './DiscountVariant.module.scss';

interface IDiscountVariant {
  control: Control;
  discountPrice: number;
  productVariationPrice: number;
  setDiscountPrice: (value: number) => void;
  setInputVariationPrice: (value: number) => void;
}

export const DiscountVariant: FC<IDiscountVariant> = ({
  control,
  discountPrice,
  setDiscountPrice,
  productVariationPrice,
  setInputVariationPrice,
}): JSX.Element => {
  const isDisabledDiscountInput = !!productVariationPrice;
  const isDisabledVariationInput = !!discountPrice;

  return (
    <div className={style.optional_wrapper}>
      <Label label="Disount for variation (optional)" htmlFor="discountVariation">
        <CommonInputPrice
          control={control}
          placeholder="0"
          setPrice={setDiscountPrice}
          nameInput="discountVariation"
          valueVariation="%"
          disabled={isDisabledDiscountInput}
        />
      </Label>

      <Label
        label="1 pcs of product variation price (optional)"
        htmlFor="markupVariation"
      >
        <div className={style.input_variation}>
          <CommonInputPrice
            control={control}
            placeholder="100%"
            setPrice={setInputVariationPrice}
            nameInput="markupVariation"
            valueVariation="%"
            disabled={isDisabledVariationInput}
          />
        </div>
      </Label>
    </div>
  );
};
