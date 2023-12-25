import React, { FC } from 'react';

import cn from 'classnames';

import style from './CellColor.module.scss';

interface ICellColor {
  id: string;
  image_url: string;
  className?: string;
  onClick: (id: string) => void;
}

export const CellColor: FC<ICellColor> = (props): JSX.Element => {
  const { id, image_url, className, onClick } = props;

  const handlerClick = (): void => {
    onClick(id);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      role="menuitem"
      onClick={handlerClick}
      style={{ backgroundImage: `url(${image_url})` }}
      className={cn(style.list_item, className)}
    />
  );
};
