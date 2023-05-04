import React, { FC } from 'react';

import ArrowDownLogo from '../../../assets/img/icons/arrow-slide-down.svg';
import ArrowUpLogo from '../../../assets/img/icons/arrow-slide-up.svg';

type SelectHeaderPropsType = {
  isOpenMenu: boolean;
  currentSelectedValue: string;
  onClick: () => void;
  className: string | undefined;
};

const SelectHeader: FC<SelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
}) => {
  const currentArrowLogo = isOpenMenu ? ArrowUpLogo : ArrowDownLogo;

  return (
    <div onClick={onClick} role="presentation" className={className}>
      {currentSelectedValue}
      <img src={currentArrowLogo} alt="currentArrowLogo" />
    </div>
  );
};

export default SelectHeader;
