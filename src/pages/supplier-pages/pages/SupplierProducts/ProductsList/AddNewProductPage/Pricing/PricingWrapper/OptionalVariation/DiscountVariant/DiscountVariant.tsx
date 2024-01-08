import React, { FC } from 'react';

import { Control, Controller } from 'react-hook-form';

import { CommonInputPrice } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/CommonPriceInput';
import { Label, Select } from 'ui-kit';

import style from './DiscountVariant.module.scss';

const markupVariation = [
  '100%',
  'Percentage (%)',
  'Coefficient  (x)',
  'Number',
]; /* todo данные с бэка */

interface IDiscountVariant {
  control: Control;
  discountPrice: number;
  setDiscountPrice: (value: number) => void;
  setSelectMarkup: (value: string) => void;
}

export const DiscountVariant: FC<IDiscountVariant> = ({
  control,
  discountPrice,
  setDiscountPrice,
  setSelectMarkup,
}): JSX.Element => {
  return (
    <div className={style.optional_wrapper}>
      <Label label="Disount for variation (optional)" htmlFor="discountVariation">
        <CommonInputPrice
          control={control}
          price={discountPrice}
          setPrice={setDiscountPrice}
          nameInput="discountVariation"
        />
      </Label>

      <Label label="Markup for variation (optional)" htmlFor="markupVariation">
        <Controller
          name="brandName"
          control={control}
          render={({ field }) => (
            <div className={style.select_container}>
              <Select
                {...field}
                className={style.main_select}
                options={markupVariation.map((text, index) => ({
                  value: index,
                  label: { text },
                }))}
                onChange={value => {
                  field.onChange(String(value.value));
                  setSelectMarkup(value.label.text);
                }}
              />
            </div>
          )}
        />
      </Label>
    </div>
  );
};
