import React, { FC, useState } from 'react';

import { BundleColorList } from './BundleColorLists/BundleColorList';
import { BundlePickableColorList } from './BundleColorLists/BundlePickableColorList';

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
          <BundleColorList bundle={bundle} />
        ) : (
          <BundlePickableColorList
            bundle={bundle}
            selectColor={setActive}
            selectedColorId={active}
          />
        )}
      </div>
    </div>
  );
};
