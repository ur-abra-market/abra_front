import React, { FC } from 'react';

import ArrowDownLogo from '../../../assets/img/icons/arrow-slide-down.svg';
import ArrowUpLogo from '../../../assets/img/icons/arrow-slide-up.svg';

import { ISelectOption, SelectPositionType } from 'ui-kit';

interface ISelectHeaderPropsType {
  isOpenMenu: boolean;
  currentSelectedValue: ISelectOption;
  onClick: () => void;
  className: string;
  menuItemsPosition?: SelectPositionType;
}

export const SelectHeader: FC<ISelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
  menuItemsPosition = 'down',
}) => {
  let currentArrowLogo;

  if (menuItemsPosition === 'up') {
    currentArrowLogo = isOpenMenu ? ArrowDownLogo : ArrowUpLogo;
  }
  if (menuItemsPosition === 'down') {
    currentArrowLogo = isOpenMenu ? ArrowUpLogo : ArrowDownLogo;
  }

  return (
    <div onClick={onClick} role="presentation" className={className}>
      {currentSelectedValue.label}
      <img src={currentArrowLogo} alt="currentArrowLogo" />
    </div>
  );
};
