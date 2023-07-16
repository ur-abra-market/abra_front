import { FC } from 'react';

import cn from 'classnames';

import style from './SelectHeader.module.scss';

import { ArrowIcon } from 'assets/icons';
import { ISelectOption } from 'ui-kit';

interface ISelectHeaderPropsType {
  isOpenMenu: boolean;
  currentSelectedValue: ISelectOption;
  onClick: () => void;
  className: string;
}

export const SelectHeader: FC<ISelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
}) => {
  return (
    <div
      role="combobox"
      className={className}
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      aria-expanded={isOpenMenu}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-owns="combobox-list"
      aria-controls="combobox-list"
      aria-labelledby="combobox-list"
    >
      {currentSelectedValue.label}
      <ArrowIcon className={cn({ [style.arrow_up]: isOpenMenu })} width="14" />
    </div>
  );
};
