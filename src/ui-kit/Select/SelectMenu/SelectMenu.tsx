import React, { FC } from 'react';

import cn from 'classnames';

import styles from './SelectMenu.module.scss';

import { ISelectOption } from 'ui-kit/Select/Select';
import { SelectItem } from 'ui-kit/Select/SelectItem/SelectItem';

interface ISelectMenuPropsType {
  selectedValue: ISelectOption;
  handleSelectedValue: (value: ISelectOption) => void;
  options: ISelectOption[];
  isOpen: boolean;
  className?: string;
  padding: string;
}

export const SelectMenu: FC<ISelectMenuPropsType> = ({
  isOpen,
  className,
  options,
  selectedValue,
  handleSelectedValue,
  padding,
}) => {
  if (!isOpen) return null;

  const mainClassName = cn(className, styles.main);
  const mappedSelectItems = options.map(el => (
    <SelectItem
      key={el.value}
      value={el}
      handleSelectedValue={handleSelectedValue}
      currentSelectedItem={selectedValue}
      style={{ padding }}
    />
  ));

  return (
    <ul
      id="combobox-list"
      role="listbox"
      aria-expanded={isOpen}
      className={mainClassName}
      aria-multiselectable="false" // indicates that multiple items can be selected from the list
      aria-orientation="vertical" // specifies the orientation of an interface or component
    >
      {mappedSelectItems}
    </ul>
  );
};
