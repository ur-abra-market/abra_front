import React, { FC } from 'react';

import { ColorItem } from './ColorItem/ColorItem';

import style from './ProductColors.module.scss';

interface IProductColors {
  selectedColorId: string | null;
  colorImages: ColorImagesType[];
  selectColor: (id: string) => void;
  className?: string;
}

interface ColorImagesType {
  id: string;
  image_url: string;
}

export const ProductColors: FC<IProductColors> = ({
  selectedColorId,
  colorImages,
  selectColor,
  className,
}): JSX.Element => {
  return (
    <ul className={style.list_items}>
      {colorImages.map(el => (
        <ColorItem
          key={el.id}
          id={el.id}
          selectedColorId={selectedColorId}
          image_url={el.image_url}
          onClick={selectColor}
          className={className || ''}
        />
      ))}
    </ul>
  );
};
