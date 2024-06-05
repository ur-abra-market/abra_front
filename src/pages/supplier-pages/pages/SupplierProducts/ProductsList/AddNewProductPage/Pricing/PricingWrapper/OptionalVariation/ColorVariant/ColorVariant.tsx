import React, { FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit';

import style from './ColorVariant.module.scss';

export interface IVariationStateType {
  id: number;
  title: string;
  image_url: string;
}

interface IColorVariant {
  price?: number;
  tempData: IVariationStateType[];
  selectedVariation: number;
  changeActiveVariation: (id: number) => void;
}

export const ColorVariant: FC<IColorVariant> = ({
  price,
  tempData,
  changeActiveVariation,
  selectedVariation,
}): JSX.Element => {
  const getButtonClassName = (id: number): string => {
    const active = id === selectedVariation;

    return cn(style.button, {
      [style.active]: active,
    });
  };

  return (
    <>
      <span className={style.label_text}>
        Choose variations for markup or discount (optional)
      </span>
      <div className={style.list_items}>
        {tempData.map((el, index) => (
          // <ProductVariation
          //   key={index}
          //   selectedColorId={selectedVariation}
          //   productId={el.id}
          //   imageUrl={el.image_url}
          //   selectColor={changeActiveVariation}
          //   disabled={!price}
          // >
          //   {el.title}
          // </ProductVariation>
          <button
            key={index}
            type="button"
            onClick={() => changeActiveVariation(el.id)}
            className={getButtonClassName(el.id)}
          >
            <img className={style.color_image} src={el.image_url} alt="color" />
            <Paragraph weight="medium">{el.title}</Paragraph>
          </button>
        ))}
      </div>
    </>
  );
};
