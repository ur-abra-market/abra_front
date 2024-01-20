import React, { FC, useState } from 'react';

import { BundleSizeList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleSizeLists/BundleSizeList';
import { BundleSizePickableList } from 'pages/general-pages/ProductPage/components/ProductParams/BundleSizeLists/BundleSizePickableList';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { Paragraph } from 'ui-kit';

import style from './ProductSizeList.module.scss';

interface IProductSize {
  bundleType: 'color' | 'size';
  bundle: IProductBundle;
}

export const ProductSizeList: FC<IProductSize> = ({
  bundleType,
  bundle,
}): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const isBundleBasedOnSize = bundleType === 'size';

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
          <BundleSizeList bundle={bundle} />
        )}
      </div>
    </div>
  );
};
