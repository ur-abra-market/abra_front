import React, { FC } from 'react';

import cn from 'classnames';

import { ISelectOption } from 'ui-kit/Select/Select';
import { SelectItem } from 'ui-kit/Select/SelectItem/SelectItem';

import styles from './SelectMenu.module.scss';

interface ISelectMenuPropsType {
  selectedValue: ISelectOption;
  handleSelectedValue: (value: ISelectOption) => void;
  options: ISelectOption[];
  isOpen: boolean;
  className?: string;
  dropOnUp: boolean;
}

export const SelectMenu: FC<ISelectMenuPropsType> = ({
  isOpen,
  className,
  options,
  selectedValue,
  handleSelectedValue,
  dropOnUp,
}) => {
  if (!isOpen) return null;

  const mainClassName = cn(className, styles.main, {
    [styles.droponup]: dropOnUp,
  });

  const mappedSelectItems = options.map(el => (
    <SelectItem
      key={el.value}
      value={el}
      handleSelectedValue={handleSelectedValue}
      currentSelectedItem={selectedValue}
    />
  ));

  return (
    <ul
      id="combobox-list"
      role="listbox"
      aria-expanded={isOpen}
      className={mainClassName}
      aria-multiselectable="false" // indicates that multiple list items can't be selected
      aria-orientation="vertical" // indicates that the orientation of the component is vertical
    >
      {mappedSelectItems}
    </ul>
  );
};
