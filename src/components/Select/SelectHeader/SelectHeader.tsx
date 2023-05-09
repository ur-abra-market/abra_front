import React, { FC } from 'react';

import ArrowDownLogo from '../../../assets/img/icons/arrow-slide-down.svg';
import ArrowUpLogo from '../../../assets/img/icons/arrow-slide-up.svg';
import { OptionType, PositionType } from '../Select';

type SelectHeaderPropsType = {
  isOpenMenu: boolean;
  currentSelectedValue: OptionType;
  onClick: () => void;
  className: string | undefined;
  position?: PositionType;
};

const SelectHeader: FC<SelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
  position = 'down',
}) => {
  let currentArrowLogo;

  if (position === 'up') {
    currentArrowLogo = isOpenMenu ? ArrowDownLogo : ArrowUpLogo;
  }
  if (position === 'down') {
    currentArrowLogo = isOpenMenu ? ArrowUpLogo : ArrowDownLogo;
  }

  return (
    <div onClick={onClick} role="presentation" className={className}>
      {currentSelectedValue.label}
      <img src={currentArrowLogo} alt="currentArrowLogo" />
    </div>
  );
};

export default SelectHeader;
