import React, { FC } from 'react';

import cn from 'classnames';

import style from './CellColor.module.scss';

interface ICellColor {
  activeId: string | null;
  image_data: ImageDataType[];
  onClick: (id: string) => void;
  className?: string;
}

type ImageDataType = {
  id: string;
  image_url: string;
};

export const CellColor: FC<ICellColor> = (props): JSX.Element => {
  const { activeId, image_data, className, onClick } = props;

  const handlerClick = (id: string): void => {
    onClick(id);
  };

  return (
    <ul className={style.list_items}>
      {image_data.map(el =>
        el.image_url.length > 0 ? (
          <li
            role="menuitem"
            key={el.id}
            onClick={() => handlerClick(el.id)}
            onKeyDown={() => handlerClick(el.id)}
            style={{ backgroundImage: `url(${el.image_url})` }}
            className={cn(style.list_item, className, {
              [style.active]: el.id === activeId,
            })}
          />
        ) : (
          <li
            role="menuitem"
            key={el.id}
            onClick={() => handlerClick(el.id)}
            onKeyDown={() => handlerClick(el.id)}
            className={cn(style.list_item, style.without_color, className, {
              [style.active]: el.id === activeId,
            })}
          >
            <div />
          </li>
        ),
      )}
    </ul>
  );
};
