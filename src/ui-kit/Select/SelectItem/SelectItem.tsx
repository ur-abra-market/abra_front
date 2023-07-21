import React, { FC, useState } from 'react';

import cn from 'classnames';

import styles from './SelectItem.module.scss';

import { ISelectOption } from 'ui-kit';
import style from 'ui-kit/Select/SelectHeader/SelectHeader.module.scss';

interface ISelectItem {
  currentSelectedItem: ISelectOption;
  value: ISelectOption;
  handleSelectedValue: (value: ISelectOption) => void;
}

export const SelectItem: FC<ISelectItem> = ({
  currentSelectedItem,
  value,
  handleSelectedValue,
}) => {
  const handleClickOnItem = (): void => {
    handleSelectedValue(value);
  };

  const [isItemHover, setItemHover] = useState(false);

  const handleHoverOnItem = (): void => {
    if (currentSelectedItem.label !== value.label) {
      setItemHover(true);
    }
  };
  const handleLeaveHoverOnItem = (): void => {
    if (currentSelectedItem.label !== value.label) {
      setItemHover(false);
    }
  };

  const selectedItemClassName = cn(styles.item, {
    [styles.item_hover]: isItemHover,
    [styles.item_selected]: currentSelectedItem.label === value.label,
  });

  return (
    <li
      role="option"
      className={selectedItemClassName}
      onClick={handleClickOnItem}
      onKeyDown={handleClickOnItem}
      onMouseEnter={handleHoverOnItem}
      onMouseLeave={handleLeaveHoverOnItem}
      aria-selected={currentSelectedItem.label === value.label} // indicates that the item is selected or active
    >
      {value.label.image_src && (
        <img src={value.label.image_src} alt="" className={style.image} />
      )}
      <p>{value.label.text}</p>
    </li>
  );
};
