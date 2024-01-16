import React, { createRef, FC, RefObject } from 'react';

import { useEqualWidth } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductSizeSelectable } from 'ui-kit';

interface IProductSizeSelectableList {
  bundle: IProductBundle;
  selectedSizeId: number | null;
  handleSelectSize: (id: number) => void;
}

export const ProductSizeSelectableList: FC<IProductSizeSelectableList> = ({
  bundle,
  selectedSizeId,
  handleSelectSize,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useEqualWidth({ refs: buttonRefs });

  return (
    <>
      {bundle.pickable_variations.map((el, i) => (
        <ProductSizeSelectable
          key={el.id}
          size={el.variation.value}
          selectedSizeId={selectedSizeId}
          handleSelectSize={handleSelectSize}
          id={`${el.id}`}
          ref={buttonRefs[i]}
        />
      ))}
    </>
  );
};
