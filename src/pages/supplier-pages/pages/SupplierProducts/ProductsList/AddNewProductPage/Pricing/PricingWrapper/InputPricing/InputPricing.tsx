import React, { FC } from 'react';

import { Control } from 'react-hook-form';

import { CommonInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/CommonPriceInput';

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
    <CommonInputPrice
      control={control}
      price={price}
      setPrice={setPrice}
      nameInput="priceItem"
    />
  );
};
