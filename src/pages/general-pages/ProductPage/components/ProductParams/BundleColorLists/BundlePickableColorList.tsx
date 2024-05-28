import React, { FC } from 'react';

import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColorPickable } from 'ui-kit';

interface IBundlePickableColorList {
  bundle: IProductBundle;
  selectedColorId: number | null;
  selectColor: (id: number) => void;
}

export const BundlePickableColorList: FC<IBundlePickableColorList> = ({
  bundle,
  selectedColorId,
  selectColor,
}): JSX.Element => {
  return (
    <>
      {bundle.pickable_variations.map(el => (
        <ProductColorPickable
          key={el.id}
          selectedColorId={selectedColorId}
          colorName={el.variation.value}
          id={el.id}
          imageUrl={el.variation.image_url || ''}
          selectColor={selectColor}
        />
      ))}
    </>
  );
};
