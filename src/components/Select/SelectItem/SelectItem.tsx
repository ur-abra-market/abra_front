import React, { FC, useState } from 'react';

import cn from 'classnames';

import { OptionType } from '../Select';

import styles from './SelectedItem.module.css';

type SelectItemPropsType = {
  currentSelectedItem: OptionType;
  value: OptionType;
  onClick: (value: OptionType) => void;
};

const SelectItem: FC<SelectItemPropsType> = ({ currentSelectedItem, value, onClick }) => {
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

  const isSelectedItem =
    currentSelectedItem.label === value.label
      ? cn(styles.item_selected, currentClassName)
      : currentClassName;

  return (
    <div
      role="presentation"
      onClick={handleClickOnItem}
      className={isSelectedItem}
      onMouseEnter={handleHoverOnItem}
      onMouseLeave={handleLeaveHoverOnItem}
    >
      {value.label}
    </div>
  );
};

export default SelectItem;
