import React, { FC } from 'react';

import cn from 'classnames';

import style from './SizeItem.module.css';

interface SizeItemProps {
  isSelected: boolean;
  label: string;
  onClick?: (label: string) => void;
  className?: string;
}

export const SizeItem: FC<SizeItemProps> = ({
  isSelected = false,
  label,
  onClick,
  className,
}): JSX.Element => {
  const handleClick = (): void => onClick?.(label);

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className={cn(
        style.size_item,
        {
          [style.base]: !isSelected,
          [style.selected]: isSelected,
        },
        className,
      )}
    >
      {label}
    </div>
  );
};
