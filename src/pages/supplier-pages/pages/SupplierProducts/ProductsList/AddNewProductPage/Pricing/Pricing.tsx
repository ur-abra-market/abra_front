import React, { FC, useState } from 'react';

import { calculateTotalPrice } from './helper/calculateTotalPrice';
import { BundleButtons, OptionalVariation, TotalPriceForm } from './PricingWrapper';

import style from './Pricing.module.scss';

export const Pricing: FC = (): JSX.Element => {
  const productPrice = 0;
  const productDiscount = 0;

  interface IVariationDataItem {
    id: number;
    image_url: string;
    title: string;
    price: {
      value: number;
      touched: boolean;
    };
    discount: {
      value: number;
    };
  }

  interface IBundleDataItem {
    id: number;
    price: number;
    title: string;
    isSelected: boolean;
    variationsPerBundle: number[];
    discount: number;
  }

  interface IState {
    product: { price: number; discount: number };
    variation: { selected: number; data: IVariationDataItem[] };
    bundle: { selected: number; data: IBundleDataItem[] };
  }

  const [pricingState, setPricingState] = useState<IState>({
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
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 2,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
          title: 'Var. 2',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 3,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
          title: 'Var. 3',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 4,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
          title: 'Var. 4',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 5,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
          title: 'Var. 5',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 6,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
          title: 'Var. 6',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
        {
          id: 7,
          image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
          title: 'Var. 7',
          price: {
            value: 0,
            touched: false,
          },
          discount: {
            value: 0,
          },
        },
      ],
    },
    bundle: {
      selected: 1,
      data: [
        {
          id: 1,
          title: 'Bundle 1',
          price: 0,
          isSelected: true,
          variationsPerBundle: [1, 2, 3],
          discount: 0,
        },
        {
          id: 2,
          title: 'Bundle 2',
          price: 0,
          isSelected: false,
          variationsPerBundle: [4, 5, 6],
          discount: 0,
        },
        {
          id: 3,
          title: 'Bundle 3',
          price: 0,
          isSelected: false,
          variationsPerBundle: [7],
          discount: 0,
        },
      ],
    },
  });

  const totalProductPrice = calculateTotalPrice(
    pricingState.product.price,
    pricingState.product.discount,
  );

  const variationPrice = pricingState.variation.data[pricingState.variation.selected - 1]
    .price.touched
    ? pricingState.variation.data[pricingState.variation.selected - 1].price.value
    : pricingState.product.price;
  const variationDiscount =
    pricingState.variation.data[pricingState.variation.selected - 1].discount.value;
  const totalVariationPrice = calculateTotalPrice(variationPrice, variationDiscount);

  const calculateBundlePrice = (
    variationsPerBundle: number[],
    variations: IVariationDataItem[],
  ): number => {
    let bundlePrice = 0;

    for (let i = 0; i < variationsPerBundle.length; i += 1) {
      bundlePrice += calculateTotalPrice(
        variations[variations[variationsPerBundle[i] - 1].id - 1].price.value,
        variations[variations[variationsPerBundle[i] - 1].id - 1].discount.value,
      );
    }

    return bundlePrice;
  };

  const bundlePrice = calculateBundlePrice(
    pricingState.bundle.data[pricingState.bundle.selected - 1].variationsPerBundle,
    pricingState.variation.data,
  );
  const bundleDiscount =
    pricingState.bundle.data[pricingState.bundle.selected - 1].discount;
  const totalBundlePrice = calculateTotalPrice(bundlePrice, bundleDiscount);

  const validateValue = (value: number, prevValue: number): number => {
    if (!Number.isNaN(value) && value >= 0 && value <= 1000000000) {
      return value;
    }

    if (!Number.isNaN(prevValue)) {
      return prevValue;
    }

    return 0;
  };

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

  const onProductPriceChange = (price: number): void => {
    setPricingState({
      ...pricingState,
      product: {
        ...pricingState.product,
        price: validateValue(price, pricingState.product.price),
      },
    });
  };

  const onProductDiscountChange = (discount: number): void => {
    setPricingState({
      ...pricingState,
      product: {
        ...pricingState.product,
        discount: validateValue(discount, pricingState.product.discount),
      },
    });
  };

  const onVariationPriceChange = (price: number): void => {
    setPricingState({
      ...pricingState,
      variation: {
        ...pricingState.variation,
        data: pricingState.variation.data.map(el =>
          el.id === pricingState.variation.selected
            ? {
                ...el,
                price: {
                  value: validateValue(
                    price,
                    pricingState.variation.data[pricingState.variation.selected - 1].price
                      .value,
                  ),
                  touched: true,
                },
              }
            : el,
        ),
      },
      bundle: {
        ...pricingState.bundle,
        data: pricingState.bundle.data.map((el: IBundleDataItem) => {
          return {
            ...el,
            price: calculateBundlePrice(
              el.variationsPerBundle,
              pricingState.variation.data,
            ),
          };
        }),
      },
    });
  };

  const onVariationDiscountChange = (discount: number): void => {
    setPricingState({
      ...pricingState,
      variation: {
        ...pricingState.variation,
        data: pricingState.variation.data.map(el =>
          el.id === pricingState.variation.selected
            ? {
                ...el,
                discount: {
                  value: validateValue(
                    discount,
                    pricingState.variation.data[pricingState.variation.selected - 1]
                      .discount.value,
                  ),
                },
              }
            : el,
        ),
      },
    });
  };

  const onBundleDiscountChange = (discount: number): void => {
    setPricingState({
      ...pricingState,
      bundle: {
        ...pricingState.bundle,
        data: pricingState.bundle.data.map(el =>
          el.id === pricingState.bundle.selected
            ? {
                ...el,
                discount: validateValue(
                  discount,
                  pricingState.bundle.data[el.id - 1].discount,
                ),
              }
            : el,
        ),
      },
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
        onProductPriceChange={onProductPriceChange}
        onProductDiscountChange={onProductDiscountChange}
      />

      <OptionalVariation
        totalPrice={totalVariationPrice}
        tempData={pricingState.variation.data}
        selectedVariation={pricingState.variation.selected}
        price={variationPrice}
        discount={variationDiscount}
        changeActiveVariation={changeActiveVariation}
        onVariationPriceChange={onVariationPriceChange}
        onVariationDiscountChange={onVariationDiscountChange}
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
        onProductPriceChange={() => {}}
        onProductDiscountChange={onBundleDiscountChange}
      />
    </form>
  );
};
