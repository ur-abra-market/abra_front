import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColorInteractive.module.scss';

interface IProductColors {
  selectedColorId: string | null;
  id: string;
  image_url: string;
  selectColor: (id: string) => void;
  className?: string;
}

export const ProductColorInteractive: FC<IProductColors> = ({
  selectedColorId,
  id,
  image_url,
  selectColor,
  className,
}): JSX.Element => {
  const isActive = id === selectedColorId;
  const classNames = cn(className, style.list_item, { [style.active]: isActive });

  return (
    <button type="button" id={id} onClick={() => selectColor(id)} className={classNames}>
      <img src={image_url} alt="color" />
    </button>
  );
};
