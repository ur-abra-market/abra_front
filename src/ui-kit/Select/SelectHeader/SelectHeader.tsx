import { FC } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from 'assets/icons'; // 24px
import { ISelectOption, SelectPositionType } from 'ui-kit';

interface ISelectHeaderPropsType {
  isOpenMenu: boolean;
  currentSelectedValue: ISelectOption;
  onClick: () => void;
  className: string;
  menuItemsPosition?: SelectPositionType;
}

const arrowIcon = {
  up: {
    true: <ArrowDownIcon />,
    false: <ArrowUpIcon />,
  },
  down: {
    true: <ArrowUpIcon />,
    false: <ArrowDownIcon />,
  },
};

export const SelectHeader: FC<ISelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
  menuItemsPosition = 'down',
}) => {
  const currentIcon = arrowIcon[menuItemsPosition][`${isOpenMenu}`];

  return (
    <div onClick={onClick} role="presentation" className={className}>
      {currentSelectedValue.label}
      {currentIcon}
    </div>
  );
};
