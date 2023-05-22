import React, { CSSProperties, FC, useState } from 'react';

import cn from 'classnames';

import styles from './SelectItem.module.css';

import { ISelectOption } from 'ui-kit';

interface ISelectItem {
  currentSelectedItem: ISelectOption;
  value: ISelectOption;
  onClick: (value: ISelectOption) => void;
  style?: CSSProperties;
}

export const SelectItem: FC<ISelectItem> = ({
  currentSelectedItem,
  value,
  onClick,
  style,
}) => {
  const handleClickOnItem = (): void => {
    onClick(value);
  };

  const [currentClassName, setCurrentClassName] = useState(styles.main);

  const handleHoverOnItem = (): void => {
    if (currentSelectedItem.label !== value.label) {
      setCurrentClassName(styles.main_hover);
    }
  };
  const handleLeaveHoverOnItem = (): void => {
    if (currentSelectedItem.label !== value.label) {
      setCurrentClassName(styles.main);
    }
  };

  const isSelectedItem = cn(
    currentSelectedItem.label === value.label && styles.item_selected,
    currentClassName,
  );

  return (
    <div
      role="presentation"
      onClick={handleClickOnItem}
      className={isSelectedItem}
      onMouseEnter={handleHoverOnItem}
      onMouseLeave={handleLeaveHoverOnItem}
      style={style}
    >
      {value.label}
    </div>
  );
};
