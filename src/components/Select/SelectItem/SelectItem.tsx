import React, { CSSProperties, FC, useState } from 'react';

import cn from 'classnames';

import { OptionType } from '../Select';

import styles from './SelectedItem.module.css';

type SelectItemPropsType = {
  currentSelectedItem: OptionType;
  value: OptionType;
  onClick: (value: OptionType) => void;
  style?: CSSProperties;
};

const SelectItem: FC<SelectItemPropsType> = ({
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
    if (currentSelectedItem.label === value.label) {
      //
    } else {
      setCurrentClassName(styles.main_hover);
    }
  };
  const handleLeaveHoverOnItem = (): void => {
    if (currentSelectedItem.label === value.label) {
      //
    } else {
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

export default SelectItem;
