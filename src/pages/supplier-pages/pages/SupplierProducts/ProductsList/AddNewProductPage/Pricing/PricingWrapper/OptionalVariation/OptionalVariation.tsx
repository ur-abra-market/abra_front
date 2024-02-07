import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { ColorVariant } from './ColorVariant';

import { TotalPriceForm } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/PricingWrapper/TotalPrice';

import style from './OptionalVariation.module.scss';

interface IOptionalVariation {
  control: Control<any>;
  totalPrice: number;
  price?: number;
}

export const OptionalVariation: FC<IOptionalVariation> = ({
  control,
  price,
  totalPrice,
}): JSX.Element => {
  return (
    <>
      <ColorVariant price={price} />

      <TotalPriceForm
        control={control}
        totalPrice={totalPrice}
        label="Variations for markup"
        disabled={false}
        priceName="variationPrice"
        discountName="discountVariationPrice"
        totalName="totalVariationPrice"
        className={style.input_wrapper}
      />
    </>
  );
};
