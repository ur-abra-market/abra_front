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
    <button
      type="button"
      onClick={onClick}
      className={cn(className, style.button)}
      aria-controls="listbox"
      aria-labelledby="combo-label"
    >
      {currentSelectedValue.label.image_src && (
        <img src={currentSelectedValue.label.image_src} alt="" />
      )}
      {currentSelectedValue.label.text}
      <ArrowIcon className={cn({ [style.arrow_up]: isOpenMenu })} width="14" />
    </button>
  );
};
