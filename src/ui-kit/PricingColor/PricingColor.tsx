import React, { FC } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit/Paragraph/Paragraph';

import style from './PricingColor.module.scss';

interface IProductColorSelectable {
  selectedColorId: number | null;
  id: number;
  imageUrl: string;
  selectColor: (id: number) => void;
  className?: string;
  title: string;
}

export const PricingColor: FC<IProductColorSelectable> = ({
  selectedColorId,
  id,
  imageUrl,
  selectColor,
  className,
  title,
}): JSX.Element => {
  const isSelected = id === selectedColorId;
  const productColorClasses = cn(className, style.button, {
    [style.active]: isSelected,
  });

  return (
    <button type="button" onClick={() => selectColor(id)} className={productColorClasses}>
      <img className={style.color_image} src={imageUrl} alt="color" />
      <Paragraph weight="medium">{title}</Paragraph>
    </button>
  );
};
