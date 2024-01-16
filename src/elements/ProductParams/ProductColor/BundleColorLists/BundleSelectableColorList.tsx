import React, { FC } from 'react';

import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColorSelectable } from 'ui-kit';

interface IBundleSelectableColorList {
  bundle: IProductBundle;
  selectedColorId: number | null;
  selectColor: (id: number) => void;
}

export const BundleSelectableColorList: FC<IBundleSelectableColorList> = ({
  bundle,
  selectedColorId,
  selectColor,
}): JSX.Element => {
  return (
    <>
      {bundle.pickable_variations.map(el => (
        <ProductColorSelectable
          key={el.id}
          selectedColorId={selectedColorId}
          id={el.id}
          imageUrl={el.variation.image_url || ''}
          selectColor={selectColor}
        />
      ))}
    </>
  );
};
