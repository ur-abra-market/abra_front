import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { calculateTotalPrice } from './helper/calculateTotalPrice';
import { BundleButtons, OptionalVariation, TotalPriceForm } from './PricingWrapper';

import style from './Pricing.module.scss';

export const Pricing: FC = (): JSX.Element => {
  const productPrice = 125;
  const productDiscount = 20;

  const [pricingState, setPricingState] = useState({
    product: {
      price: productPrice,
      discount: productDiscount,
    },
    variation: {
      selected: 1,
      data: [
        {
          id: 1,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
          title: 'Var. 1',
          price: 10,
          discount: 30,
          touched: false,
        },
        {
          id: 2,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
          title: 'Var. 2',
          price: 40,
          discount: 10,
          touched: false,
        },
        {
          id: 3,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
          title: 'Var. 3',
          price: 1000,
          discount: 50,
          touched: false,
        },
        {
          id: 4,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
          title: 'Var. 4',
          price: 82,
          discount: 10,
          touched: false,
        },
        {
          id: 5,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
          title: 'Var. 5',
          price: 83,
          discount: 40,
          touched: false,
        },
        {
          id: 6,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
          title: 'Var. 6',
          price: 9000,
          discount: 0,
          touched: false,
        },
        {
          id: 7,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
          title: 'Var. 7',
          price: 2000,
          discount: 50,
          touched: false,
        },
      ],
    },
    bundle: {
      selected: 1,
      data: [
        { id: 1, title: 'Bundle 1', isSelected: true, price: 100, discount: 30 },
        { id: 2, title: 'Bundle 2', isSelected: false, price: 200, discount: 0 },
        { id: 3, title: 'Bundle 3', isSelected: false, price: 300, discount: 0 },
      ],
    },
  });

  // const productPrice = pricingState.bundle.data[pricingState.bundle.selected - 1].price;
  // const productDiscountPrice = pricingState.bundle.data[pricingState.bundle.selected - 1].discount;

  const totalProductPrice = calculateTotalPrice(
    pricingState.product.price,
    pricingState.product.discount,
  );

  const variationPrice = pricingState.variation.data[pricingState.variation.selected - 1]
    .touched
    ? productPrice
    : pricingState.variation.data[pricingState.variation.selected - 1].price;

  const variationDiscount = pricingState.variation.data[
    pricingState.variation.selected - 1
  ].touched
    ? productDiscount
    : pricingState.variation.data[pricingState.variation.selected - 1].discount;
  const totalVariationPrice = calculateTotalPrice(variationPrice, variationDiscount);

  const bundlePrice = pricingState.bundle.data[pricingState.bundle.selected - 1].price;
  const bundleDiscount =
    pricingState.bundle.data[pricingState.bundle.selected - 1].discount;
  const totalBundlePrice = calculateTotalPrice(bundlePrice, bundleDiscount);

  const changeActiveBundle = (id: number): void => {
    setPricingState({
      ...pricingState,
      bundle: { ...pricingState.bundle, selected: id },
    });
  };

  const changeActiveVariation = (id: number): void => {
    setPricingState({
      ...pricingState,
      variation: { ...pricingState.variation, selected: id },
    });
  };

  return (
    <form className={style.pricing_container}>
      <TotalPriceForm
        label="Product price for 1 pcs"
        priceName="productPrice"
        totalName="totalProductPrice"
        discountName="discountProductPrice"
        totalPrice={totalProductPrice}
        disabled={false}
        className={style.input_wrapper}
        price={pricingState.product.price}
        discount={pricingState.product.discount}
      />

      <OptionalVariation
        totalPrice={totalVariationPrice}
        tempData={pricingState.variation.data}
        selectedVariation={pricingState.variation.selected}
        price={variationPrice}
        discount={variationDiscount}
        changeActiveVariation={changeActiveVariation}
      />

      <BundleButtons
        tempData={pricingState.bundle.data}
        selectedBundle={pricingState.bundle.selected}
        changeActiveBundle={changeActiveBundle}
      />

      <TotalPriceForm
        label="Bundle price"
        priceName="bundlePrice"
        totalName="totalBundlePrice"
        discountName="bundleDiscountPrice"
        price={bundlePrice}
        discount={bundleDiscount}
        totalPrice={totalBundlePrice}
        disabled
      />
    </form>
  );
};
