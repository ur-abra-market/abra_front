import React, { FC } from 'react';

import cn from 'classnames';

import { Paragraph, ProductVariation } from 'ui-kit';

import style from './ColorVariant.module.scss';

export interface IVariationStateType {
  id: number;
  title: string;
  image_url: string;
}

interface IColorVariant {
  tempData: IVariationStateType[];
  selectedVariation: number;
  changeActiveVariation: (id: number) => void;
}

export const ColorVariant: FC<IColorVariant> = ({
  tempData,
  changeActiveVariation,
  selectedVariation,
}): JSX.Element => {
  return (
    <>
      <span className={style.label_text}>
        Choose variations for markup or discount (optional)
      </span>
      <div className={style.list_items}>
        {tempData.map((el, index) => (
          <ProductVariation
            className={cn(style.button, {
              [style.active]: el.id === selectedVariation,
            })}
            key={index}
            changeActiveVariation={changeActiveVariation}
            variationId={el.id}
            imageUrl={el.image_url}
            selectedColorId={selectedVariation}
            title={el.title}
          />
        ))}
      </div>
    </>
  );
};
