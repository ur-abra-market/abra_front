import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';

import { DiscountInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/helper/utils/CommonInputPrice';
import { Input, Label } from 'ui-kit';

import style from './TotalPrice.module.scss';

export interface ITotalPrice {
  totalPrice: number;
  label: string;
  className?: string;
  disabled: boolean;
  priceName: string;
  discountName: string;
  totalName: string;
  price: number;
  discount: number;
  onProductPriceChange: (price: number) => void;
  onProductDiscountChange: (discount: number) => void;
}

export const TotalPriceForm: FC<ITotalPrice> = ({
  totalPrice,
  label,
  className,
  disabled,
  priceName,
  discountName,
  totalName,
  discount,
  price,
  onProductPriceChange,
  onProductDiscountChange,
  ...rest
}): JSX.Element => {
  return (
    <div className={cn(style.total_price, className)}>
      <Label label={label} htmlFor="bundlePrice">
        <div className={style.price_item}>
          <Input
            {...rest}
            value={price || ''}
            classNameWrapper={style.price_wrapper}
            className={style.price_input}
            disabled={disabled}
            placeholder="0"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onProductPriceChange(Number(event.currentTarget.value.trim()));
            }}
          />
          <span className={style.currency_value}>$</span>
        </div>
      </Label>

      <div className={style.discount_total_wrapper}>
        <Label label="Discount" htmlFor="discount">
          <DiscountInputPrice
            value={discount}
            placeholder="0"
            valueVariation="%"
            onProductDiscountChange={onProductDiscountChange}
          />
        </Label>

        <Label label="Total" htmlFor="totalPrice">
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
