import React, { FC } from 'react';

import cn from 'classnames';

import style from 'ui-kit/ProductParams/ProductColors/ProductColors.module.scss';

interface IColorItem {
  id: string;
  selectedColorId: string | null;
  image_url: string;
  onClick: (id: string) => void;
  className: string;
}

export const ColorItem: FC<IColorItem> = ({
  id,
  selectedColorId,
  image_url,
  onClick,
  className,
}) => {
  const isActive = id === selectedColorId;
  const styleProps = image_url ? { backgroundImage: `url(${image_url})` } : undefined;

  return (
    <li
      role="menuitem"
      key={id}
      onClick={() => onClick(id)}
      onKeyDown={() => onClick(id)}
      style={styleProps}
      className={cn(
        className,
        style.list_item,
        { [style.active]: isActive },
        { [style.without_color]: !image_url },
      )}
    >
      {!image_url && <div />}
    </li>
  );
};
