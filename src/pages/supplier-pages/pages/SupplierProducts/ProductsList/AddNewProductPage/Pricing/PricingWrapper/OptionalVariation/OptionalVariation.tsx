import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { ColorVariant } from './ColorVariant';

import { TotalPriceForm } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/helper/utils/TotalPrice';
import { IVariationStateType } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/PricingWrapper/OptionalVariation/ColorVariant/ColorVariant';

import style from './OptionalVariation.module.scss';

interface IOptionalVariation {
  totalPrice: number;
  price: number;
  discount: number;
  tempData: IVariationStateType[];
  selectedVariation: number;
  changeActiveVariation: (id: number) => void;
  onVariationPriceChange: (price: number) => void;
  onVariationDiscountChange: (discount: number) => void;
}

export const OptionalVariation: FC<IOptionalVariation> = ({
  price,
  totalPrice,
  tempData,
  selectedVariation,
  changeActiveVariation,
  discount,
  onVariationPriceChange,
  onVariationDiscountChange,
}): JSX.Element => {
  return (
    <>
      <ColorVariant
        price={price}
        tempData={tempData}
        selectedVariation={selectedVariation}
        changeActiveVariation={changeActiveVariation}
      />

      <TotalPriceForm
        totalPrice={totalPrice}
        label="Variations for markup"
        disabled={false}
        priceName="variationPrice"
        discountName="discountVariationPrice"
        totalName="totalVariationPrice"
        className={style.input_wrapper}
        price={price}
        discount={discount}
        onProductPriceChange={onVariationPriceChange}
        onProductDiscountChange={onVariationDiscountChange}
      />
    </>
  );
};
