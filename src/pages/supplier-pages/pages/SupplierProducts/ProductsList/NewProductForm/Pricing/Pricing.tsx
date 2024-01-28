import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import {
  BundleButtons,
  InputPricing,
  OptionalVariation,
  TotalPrice,
} from './PricingWrapper';

import style from './Pricing.module.scss';

const bundlePrice = 136; /* mock data todo */
const variationsPrice = 18; /* mock data todo */

export const Pricing: FC = (): JSX.Element => {
  const { control } = useForm();

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountVariationPrice, setDiscountVariationPrice] = useState(0);
  const [productVariationPrice, setProductVariationPrice] = useState(0);

  const calculateTotalPrice = (): number => {
    let result = 1;

    if (price !== 0) {
      result *= price;
    }

    if (discountVariationPrice !== 0) {
      result *= discountVariationPrice / 100;
    }

    if (discount !== 0) {
      result *= discount / 100;
    }

    if (productVariationPrice !== 0) {
      result *= productVariationPrice / 100;
    }

    result *= bundlePrice * variationsPrice;

    return Number(result.toFixed(2));
  };

  const totalPrice = calculateTotalPrice();

  return (
    <form className={style.pricing_container}>
      <InputPricing control={control} price={price} setPrice={setPrice} />

      <OptionalVariation
        control={control}
        discountPrice={discountVariationPrice}
        productVariationPrice={productVariationPrice}
        setDiscountPrice={setDiscountVariationPrice}
        setInputVariationPrice={setProductVariationPrice}
      />

      <BundleButtons />

      <TotalPrice
        bundlePrice={bundlePrice}
        setDiscount={setDiscount}
        totalPrice={totalPrice}
      />
    </form>
  );
};
