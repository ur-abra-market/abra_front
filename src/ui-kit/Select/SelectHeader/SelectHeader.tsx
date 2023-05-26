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

export const SelectHeader: FC<ISelectHeaderPropsType> = ({
  currentSelectedValue,
  onClick,
  className,
  isOpenMenu,
  menuItemsPosition = 'down',
}) => (
  <div onClick={onClick} role="presentation" className={className}>
    {currentSelectedValue.label}
    {isOpenMenu && menuItemsPosition === 'up' ? <ArrowDownIcon /> : <ArrowUpIcon />}
  </div>
);
