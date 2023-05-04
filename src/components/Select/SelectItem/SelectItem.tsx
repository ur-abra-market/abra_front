import React, { FC, useState } from 'react';

import cn from 'classnames';

import { OptionType } from '../Select';

import styles from './SelectedItem.module.css';

type SelectItemPropsType = {
  currentSelectedItem: string;
  value: OptionType;
  onClick: (value: string) => void;
};

const SelectItem: FC<SelectItemPropsType> = ({ currentSelectedItem, value, onClick }) => {
  const handleClickOnItem = (): void => {
    onClick(value.label);
  };

  const [currentClassName, setCurrentClassName] = useState(styles.main);

  const handleHoverOnItem = (): void => {
    if (currentSelectedItem === value.label) {
      //
    } else {
      setCurrentClassName(styles.main_hover);
    }
  };
  const handleLeaveHoverOnItem = (): void => {
    if (currentSelectedItem === value.label) {
      //
    } else {
      setCurrentClassName(styles.main);
    }
  };

  const isSelectedItem =
    currentSelectedItem === value.label
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
