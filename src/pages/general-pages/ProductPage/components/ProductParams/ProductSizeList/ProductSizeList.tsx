import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from 'common/hooks';
import { BundleSizeList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleSizeLists/BundleSizeList';
import { BundleSizePickableList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleSizeLists/BundleSizePickableList';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { Paragraph } from 'ui-kit';

import style from './ProductSizeList.module.scss';

interface IProductSize {
  bundleType: 'color' | 'size';
  bundle: IProductBundle;
  setBundleVariationPodId?: (value: number | null) => void;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
}

export const ProductSizeList: FC<IProductSize> = ({
  bundleType,
  bundle,
  setBundleVariationPodId,
  handleSelectColorOrSize,
  selectedId,
  isBundles,
}): JSX.Element => {
  const bundleVariationPods = useAppSelector(
    state => state.product.productCard.bundle_variation_pods,
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const isBundleBasedOnSize = bundleType === 'size';

  useEffect(() => {
    const bundle_variation_pod = bundleVariationPods.find(
      el => el.bundle_variations[0].variation_value_to_product_id === selectedSize,
    );

    if (bundle_variation_pod) {
      setBundleVariationPodId?.(bundle_variation_pod.id);
    }
  }, [bundleVariationPods, selectedSize, setBundleVariationPodId]);

  return (
    <div className={style.product_size_container}>
      <Paragraph size="m" className={style.text}>
        Size and quantity
      </Paragraph>

      <div className={style.items}>
        {isBundleBasedOnSize ? (
          <BundleSizePickableList
            bundle={bundle}
            selectedSizeId={selectedSize}
            handleSelectSize={setSelectedSize}
          />
        ) : (
          <BundleSizeList
            selectedId={selectedId}
            handleSelectColorOrSize={handleSelectColorOrSize}
            bundle={bundle}
            isBundles={isBundles}
          />
        )}
      </div>
    </div>
  );
};
