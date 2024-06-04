import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { calculateTotalPrice } from './helper/calculateTotalPrice';
import { BundleButtons, OptionalVariation, TotalPriceForm } from './PricingWrapper';

import style from './Pricing.module.scss';

const bundlePriceData = 100; /* mock data todo */

export const Pricing: FC = (): JSX.Element => {
  const defaultValues = {
    productPrice: 0,
    discountProductPrice: 0,
    totalProductPrice: 0,
    variationPrice: 0,
    discountVariationPrice: 0,
    totalVariationPrice: 0,
    bundlePrice: bundlePriceData,
    bundleDiscountPrice: 0,
    totalBundlePrice: 0,
  };

  const [controlValues, setControlValues] = useState({
    defaultValues,
    wasVariationChange: false,
  });

  const { control, watch, getValues } = useForm({
    defaultValues: controlValues.defaultValues,
  });

  const totalProductPrice = calculateTotalPrice(
    Number(watch('productPrice')),
    watch('discountProductPrice'),
  );

  const totalVariationPrice = calculateTotalPrice(
    Number(watch('variationPrice')),
    watch('discountVariationPrice'),
  );

  const totalBundlePrice = calculateTotalPrice(
    Number(bundlePriceData),
    watch('bundleDiscountPrice'),
  );

  return (
    <form className={style.pricing_container}>
      <TotalPriceForm
        control={control}
        label="Product price for 1 pcs"
        priceName="productPrice"
        totalName="totalProductPrice"
        discountName="discountProductPrice"
        totalPrice={totalProductPrice}
        disabled={false}
        className={style.input_wrapper}
      />

      <OptionalVariation
        price={getValues('variationPrice')}
        totalPrice={totalVariationPrice}
        control={control}
      />

      <BundleButtons />

      <TotalPriceForm
        control={control}
        label="Bundle price"
        priceName="bundlePrice"
        totalName="totalBundlePrice"
        discountName="bundleDiscountPrice"
        totalPrice={totalBundlePrice}
        disabled
      />
    </form>
  );
};
