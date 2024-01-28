import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { CommonInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Pricing/CommonInputPrice';
import { Input, Label } from 'ui-kit';

import style from './TotalPrice.module.scss';

export interface ITotalPrice {
  totalPrice: number;
  bundlePrice: number;
  setDiscount: (discount: number) => void;
}

export const TotalPrice: FC<ITotalPrice> = ({
  totalPrice,
  bundlePrice,
  setDiscount,
}): JSX.Element => {
  const { control } = useForm();

  return (
    <div className={style.total_price}>
      <Label label="Bundle price" htmlFor="bundlePrice">
        <div className={style.price_item}>
          <Input
            value={bundlePrice}
            classNameWrapper={style.price_wrapper}
            className={style.price_input}
            disabled
          />
          <span className={style.currency_value}>$</span>
        </div>
      </Label>
      <div className={style.discount_total_wrapper}>
        <Label label="Discount" htmlFor="discountVariation">
          <CommonInputPrice
            control={control}
            placeholder="0"
            setPrice={setDiscount}
            nameInput="discountVariation"
            valueVariation="%"
          />
        </Label>
        <Label label="Total">
          <div className={style.price_item}>
            <Input
              value={totalPrice}
              classNameWrapper={style.price_wrapper}
              className={style.price_input}
              disabled
            />
            <span className={style.currency_value}>$</span>
          </div>
        </Label>
      </div>
    </div>
  );
};
