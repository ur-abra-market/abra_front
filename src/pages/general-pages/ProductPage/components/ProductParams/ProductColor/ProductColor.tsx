import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from 'common/hooks';
import { BundleColorList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleColorLists/BundleColorList';
import { BundlePickableColorList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleColorLists/BundlePickableColorList';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { Paragraph } from 'ui-kit';

import style from './ProductColor.module.scss';

interface IProductColor {
  bundleType: 'color' | 'size';
  bundle: IProductBundle;
  setBundleVariationPodId?: (value: number | null) => void;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
}

export const ProductColor: FC<IProductColor> = ({
  bundleType,
  bundle,
  setBundleVariationPodId,
  isBundles,
  selectedId,
  handleSelectColorOrSize,
}): JSX.Element => {
  const bundleVariationPods = useAppSelector(
    state => state.product.productCard.bundle_variation_pods,
  );
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const isBundleBasedOnSize = bundleType === 'size';

  useEffect(() => {
    const bundle_variation_pod = bundleVariationPods.find(
      el => el.bundle_variations[0].variation_value_to_product_id === selectedColor,
    );

    if (bundle_variation_pod) {
      setBundleVariationPodId?.(bundle_variation_pod.id);
    }
  }, [bundleVariationPods, selectedColor, setBundleVariationPodId]);

  return (
    <div className={style.product_color_container}>
      <Paragraph size="m" className={style.text}>
        Select color
      </Paragraph>
      <div className={style.items}>
        {isBundleBasedOnSize ? (
          <BundleColorList
            handleSelectColorOrSize={handleSelectColorOrSize}
            isBundles={isBundles}
            selectedId={selectedId}
            bundle={bundle}
          />
        ) : (
          <BundlePickableColorList
            bundle={bundle}
            selectColor={setSelectedColor}
            selectedColorId={selectedColor}
          />
        )}
      </div>
    </div>
  );
};
