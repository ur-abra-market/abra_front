import React, { CSSProperties, FC } from 'react';

import ArrowDownLogo from '../../../../assets/img/icons/arrow-slide-down.svg';
import ArrowUpLogo from '../../../../assets/img/icons/arrow-slide-up.svg';
import { IOption, PositionType } from '../Select';

type SelectHeaderPropsType = {
  isOpenMenu: boolean;
  currentSelectedValue: IOption;
  onClick: () => void;
  className: string | undefined;
  position?: PositionType;
  style?: CSSProperties;
};

const SelectHeader: FC<SelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
  position = 'down',
  style,
}) => {
  let currentArrowLogo;

  if (position === 'up') {
    currentArrowLogo = isOpenMenu ? ArrowDownLogo : ArrowUpLogo;
  }
  if (position === 'down') {
    currentArrowLogo = isOpenMenu ? ArrowUpLogo : ArrowDownLogo;
  }

  return (
    <div onClick={onClick} role="presentation" className={className} style={style}>
      {currentSelectedValue.label}
      <img src={currentArrowLogo} alt="currentArrowLogo" />
    </div>
  );
};

export default SelectHeader;
