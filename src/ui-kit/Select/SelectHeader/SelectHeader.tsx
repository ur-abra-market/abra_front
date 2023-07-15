import { FC } from 'react';

import cn from 'classnames';

import style from './SelectHeader.module.scss';

import { ArrowIcon } from 'assets/icons';
import { Button, ISelectOption } from 'ui-kit';

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
    <Button
      color="white"
      onChange={() => currentSelectedValue.label}
      onClick={onClick}
      role="presentation"
      className={className}
    >
      {currentSelectedValue.label}
      <ArrowIcon className={cn({ [style.arrow_up]: isOpenMenu })} width="14" />
    </Button>
  );
};
