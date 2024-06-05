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
  ...rest
}): JSX.Element => {
  const productColorClasses = cn(className, style.button, {
    [style.active]: productId === selectedColorId,
  });

  const onClickHandler = (): void => {
    console.log(333);
    selectColor(productId);
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={productColorClasses}
      {...rest}
    >
      <img className={style.color_image} src={imageUrl} alt="color" />
      <Paragraph weight="medium">{children}</Paragraph>
    </button>
  );
};
