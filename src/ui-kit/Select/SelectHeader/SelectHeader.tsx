import { FC } from 'react';

import cn from 'classnames';

import style from './SelectHeader.module.scss';

import { ArrowIcon } from 'assets/icons';
import { ISelectOption } from 'ui-kit';

interface ISelectHeaderPropsType {
  isOpenMenu: boolean;
  currentSelectedValue: ISelectOption;
  handleSelectState: () => void;
  className: string;
}

export const SelectHeader: FC<ISelectHeaderPropsType> = ({
  currentSelectedValue,
  handleSelectState,
  className,
  isOpenMenu,
}) => {
  return (
    <div
      role="combobox"
      className={className}
      tabIndex={0}
      onClick={handleSelectState}
      onKeyDown={handleSelectState}
      aria-expanded={isOpenMenu}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-owns="combobox-list"
      aria-controls="combobox-list"
      aria-labelledby="combobox-list"
    >
      {currentSelectedValue.label.image_src && (
        <img src={currentSelectedValue.label.image_src} alt="" className={style.image} />
      )}
      {currentSelectedValue.label.text}
      <ArrowIcon className={cn({ [style.arrow_up]: isOpenMenu })} width="14" />
    </div>
  );
};

/**
 * @description ARIA-attributes
 * aria-expanded - indicates if the menu is open combobox
 * aria-haspopup - indicates that the combo box's dropdown menu is a list of options
 * aria-autocomplete - indicates that the combo box provides auto-completion based on the available options
 * aria-owns - indicates the ID of the element, which is the parameter list
 * aria-controls - indicates the ID of the element, which contains a list of options controlled by the combo box
 * aria-labelledby - indicates the ID of the element, the contents of which will be used as the label for the combo box
 */
