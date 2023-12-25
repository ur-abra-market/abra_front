import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColors.module.scss';

interface IProductColors {
  selectedColorId: string | null;
  colorImages: ColorImagesType[];
  selectColor: (id: string) => void;
  className?: string;
}

type ColorImagesType = {
  id: string;
  image_url: string;
};

export const ProductColors: FC<IProductColors> = ({
  selectedColorId,
  colorImages,
  className,
  selectColor,
}): JSX.Element => {
  return (
    <ul className={style.list_items}>
      {colorImages.map(el => {
        const isActive = el.id === selectedColorId;
        const classNames = cn(className, style.list_item, { [style.active]: isActive });

        return el.image_url.length > 0 ? (
          <li
            role="menuitem"
            key={el.id}
            onClick={() => selectColor(el.id)}
            onKeyDown={() => selectColor(el.id)}
            style={{ backgroundImage: `url(${el.image_url})` }}
            className={cn(classNames)}
          />
        ) : (
          <li
            role="menuitem"
            key={el.id}
            onClick={() => selectColor(el.id)}
            onKeyDown={() => selectColor(el.id)}
            className={cn(classNames, style.without_color)}
          >
            <div />
          </li>
        );
      })}
    </ul>
  );
};
