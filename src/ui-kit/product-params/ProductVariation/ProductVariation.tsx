import React, { ComponentPropsWithoutRef, FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './ProductVariation.module.scss';

interface IProductVariation extends ComponentPropsWithoutRef<'button'> {
  variationId: number;
  imageUrl: string;
  title: string;
  className?: string;
  selectedColorId: number;
  changeActiveVariation: (id: number) => void;
}

export const ProductVariation: FC<IProductVariation> = ({
  variationId,
  imageUrl,
  className,
  changeActiveVariation,
  selectedColorId,
  title,
  ...rest
}): JSX.Element => {
  return (
    <button
      type="button"
      onClick={() => changeActiveVariation(variationId)}
      className={className}
      {...rest}
    >
      <img className={style.color_image} src={imageUrl} alt="color" />
      <Paragraph weight="medium">{title}</Paragraph>
    </button>
  );
};
