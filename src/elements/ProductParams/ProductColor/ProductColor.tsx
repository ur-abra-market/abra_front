import React, { FC, useState } from 'react';

import { PickableVariationColorList } from './BundleColorLists/PickableVariationColorList';
import { ProductVariationColorList } from './BundleColorLists/ProductVariationColorList';

import { IProductBundle } from 'store/reducers/productSlice/types';
import { Paragraph } from 'ui-kit';

import style from './ProductColor.module.scss';

interface IProductColor {
  bundleType: 'color' | 'size';
  bundle: IProductBundle;
}

export const ProductColor: FC<IProductColor> = ({ bundleType, bundle }): JSX.Element => {
  const [active, setActive] = useState<number | null>(null);
  const hasSizeBundle = bundleType === 'size';

  return (
    <div className={style.product_color_container}>
      <Paragraph size="m" className={style.text}>
        Select color
      </Paragraph>
      <div className={style.items}>
        {hasSizeBundle ? (
          <ProductVariationColorList bundle={bundle} />
        ) : (
          <PickableVariationColorList
            bundle={bundle}
            selectColor={setActive}
            selectedColorId={active}
          />
        )}
      </div>
    </div>
  );
};
