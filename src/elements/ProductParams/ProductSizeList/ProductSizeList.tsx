import React, { FC, useState } from 'react';

import { ProductSizeLockedList } from './BundleSizeLists/ProductSizeLockedList';
import { ProductSizeSelectableList } from './BundleSizeLists/ProductSizeSelectableList';

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
  const [active, setActive] = useState<number | null>(null);
  const hasSizeBundle = bundleType === 'size';

  return (
    <div className={style.product_size_container}>
      <Paragraph size="m" className={style.text}>
        Size and quantity
      </Paragraph>

      <div className={style.items}>
        {hasSizeBundle ? (
          <ProductSizeSelectableList
            bundle={bundle}
            selectedSizeId={active}
            handleSelectSize={setActive}
          />
        ) : (
          <ProductSizeLockedList bundle={bundle} />
        )}
      </div>
    </div>
  );
};
