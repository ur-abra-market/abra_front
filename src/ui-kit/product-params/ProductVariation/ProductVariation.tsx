import React, { ComponentPropsWithoutRef, FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './ProductVariation.module.scss';

interface IProductVariation extends ComponentPropsWithoutRef<'button'> {
  selectedColorId?: number | null;
  productId: number;
  imageUrl: string;
  selectColor: (id: number) => void;
  className?: string;
  children: string;
}

export const ProductVariation: FC<IProductVariation> = ({
  selectedColorId,
  productId,
  imageUrl,
  selectColor,
  className,
  children,
}): JSX.Element => {
  const productColorClasses = cn(className, style.button, {
    [style.active]: productId === selectedColorId,
  });

  return (
    <button
      type="button"
      onClick={() => selectColor(productId)}
      className={productColorClasses}
    >
      <img className={style.color_image} src={imageUrl} alt="color" />
      <Paragraph weight="medium">{children}</Paragraph>
    </button>
  );
};
