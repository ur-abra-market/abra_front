import React, { FC } from 'react';

import cn from 'classnames';
import { Control, Controller } from 'react-hook-form';

import { DiscountInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/helper/utils/CommonInputPrice';
import { Input, Label } from 'ui-kit';

import style from './TotalPrice.module.scss';

export interface ITotalPrice {
  totalPrice: number;
  control: Control<any>;

  label: string;
  className?: string;
  disabled: boolean;

  priceName: string;
  discountName: string;
  totalName: string;
}

export const TotalPriceForm: FC<ITotalPrice> = ({
  totalPrice,
  label,
  control,
  className,
  disabled,
  priceName,
  discountName,
  totalName,
  ...res
}): JSX.Element => {
  return (
    <div className={cn(style.total_price, className)}>
      <Label label={label} htmlFor="bundlePrice">
        <div className={style.price_item}>
          <Controller
            control={control}
            name={priceName}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  {...res}
                  value={field.value || ''}
                  classNameWrapper={style.price_wrapper}
                  className={style.price_input}
                  disabled={disabled}
                  placeholder="0"
                />
              );
            }}
          />
          <span className={style.currency_value}>$</span>
        </div>
      </Label>

      <div className={style.discount_total_wrapper}>
        <Label label="Discount" htmlFor="discount">
          <DiscountInputPrice
            control={control}
            placeholder="0"
            nameInput={discountName}
            valueVariation="%"
          />
        </Label>

        <Label label="Total" htmlFor="totalPrice">
          <div className={style.price_item}>
            <Controller
              control={control}
              render={() => {
                return (
                  <Input
                    value={totalPrice}
                    classNameWrapper={style.price_wrapper}
                    className={style.price_input}
                    disabled
                  />
                );
              }}
              name={totalName}
            />
            <span className={style.currency_value}>$</span>
          </div>
        </Label>
      </div>
    </div>
  );
};
