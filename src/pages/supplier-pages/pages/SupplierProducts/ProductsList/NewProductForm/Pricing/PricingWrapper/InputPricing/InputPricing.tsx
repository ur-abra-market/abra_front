import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { CommonInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Pricing/CommonInputPrice';
import { Label } from 'ui-kit';

interface IInputPricing {
  control: Control;
  price: number;
  setPrice: (value: number) => void;
}

export const InputPricing: FC<IInputPricing> = ({
  control,
  price,
  setPrice,
}): JSX.Element => {
  return (
    <Label label="Product price for 1 pcs" htmlFor="priceItem">
      <CommonInputPrice
        control={control}
        placeholder={String(price)}
        setPrice={setPrice}
        nameInput="priceItem"
        valueVariation="$"
      />
    </Label>
  );
};
