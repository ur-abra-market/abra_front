import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import {
  BundleButtons,
  InputPricing,
  OptionalVariation,
  TotalPrice,
} from './PricingWrapper';

import style from './Pricing.module.scss';

export const Pricing: FC = (): JSX.Element => {
  const { control } = useForm();

  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [selectMarkup, setSelectMarkup] = useState(''); /* todo какие
   вариации нужно выбирать  */

  const totalPrice = price * discountPrice * 0.7; /* todo как будет
   считаться итоговая сумма  */

  return (
    <form className={style.pricing_container}>
      <InputPricing control={control} price={price} setPrice={setPrice} />

      <OptionalVariation
        control={control}
        discountPrice={discountPrice}
        setDiscountPrice={setDiscountPrice}
        setSelectMarkup={setSelectMarkup}
      />

      <BundleButtons />

      <TotalPrice price={price} discountPrice={discountPrice} totalPrice={totalPrice} />
    </form>
  );
};
