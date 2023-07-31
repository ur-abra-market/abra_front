import React, { forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './Select.module.scss';
import { SelectHeader } from './SelectHeader/SelectHeader';
import { SelectMenu } from './SelectMenu/SelectMenu';

import { useOnClickOutside, useOnHoverOutside } from 'common/hooks';

const KEYBOARD = {
  ENTER: 'Enter',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ESCAPE: 'Escape',
};

const PREV = 1;
const NEXT = 1;

export type SelectPositionType = 'up' | 'down';

export interface ISelectOption {
  label: { text: string; image_src?: string };
  value: any;
}

export interface ISelect {
  options: ISelectOption[];
  controlledValue?: ISelectOption;
  onChange?: (value: ISelectOption) => void;
  error?: string;
  placeholder?: string;
  defaultValue?: string | number;
  width?: string;
  className?: string;
  menuItemsPosition?: SelectPositionType;
  header?: boolean; // to add header use --> header={true}
  disabled?: boolean;
  dropOnUp?: boolean;
}

export const Select = forwardRef(
  (
    {
      options,
      controlledValue,
      placeholder,
      onChange,
      error,
      width,
      className,
      menuItemsPosition = 'down',
      header = false,
      defaultValue,
      disabled,
      dropOnUp = false,
    }: ISelect,
    ref,
  ) => {
    const placeholderObj = placeholder
      ? { label: { text: placeholder }, value: placeholder }
      : null;

    const defaultSelectedValue = placeholderObj || options[0];
    const [selectedValue, setSelectedValue] =
      useState<ISelectOption>(defaultSelectedValue);

    const currentSelectedValue = controlledValue || selectedValue;

    useEffect(() => {
      if (defaultValue) {
        const currentValue = options.find(el => el.value === defaultValue);

        if (currentValue) setSelectedValue(currentValue);
      }
    }, [defaultValue, options]);

    const handleSetSelectedValue = (option: ISelectOption): void => {
      if (option !== currentSelectedValue) {
        if (controlledValue) {
          setSelectedValue(controlledValue);
        } else {
          setSelectedValue(option);
        }
        if (onChange) {
          onChange(option);
        }
      }
      handleCloseSelectMenu();
    };

    const [isOpenItemsMenu, setIsOpenItemsMenu] = useState(false);

    const headerClassname = cn(className, styles.header, {
      [styles.opened_menu_up_pos_header]:
        header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active]: header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active_up]: header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active]: header && menuItemsPosition === 'down' && isOpenItemsMenu,
      [styles.focus_disabled]: isOpenItemsMenu && !dropOnUp,
      [styles.dropOnUp]: isOpenItemsMenu && dropOnUp,
      [styles.header_disabled]: disabled,
    });
    const menuClassname = cn({
      [styles.closed_menu]: !header,
      [styles.opened_menu_up_pos]:
        header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.menu_up_pos]: menuItemsPosition === 'up' && isOpenItemsMenu,
    });

    const handleChangeSelectState = (): void => {
      if (disabled) {
        setIsOpenItemsMenu(false);

        return;
      }

      setIsOpenItemsMenu(prev => !prev);
    };

    const handleCloseSelectMenu = (): void => {
      if (isOpenItemsMenu) {
        setIsOpenItemsMenu(false);
      }
    };
    const mainDivRef = useOnClickOutside(handleCloseSelectMenu);

    useOnHoverOutside(mainDivRef, () => {
      window.onscroll = () => {
        setIsOpenItemsMenu(false);

        return true;
      };
    });

    useEffect(() => {
      let currentItemId =
        options.findIndex(el => el.label.text === currentSelectedValue.label.text) || 0;

      if (disabled) {
        handleCloseSelectMenu();

        return;
      }

      if (isOpenItemsMenu) {
        const test = window.scrollY;

        window.onscroll = () => {
          window.scroll(0, test);
        };
        document.onkeydown = e => {
          const keyCode = e.code;

          e.preventDefault();
          if (keyCode === KEYBOARD.ENTER) {
            handleSetSelectedValue(options[currentItemId]);
          }
          if (keyCode === KEYBOARD.ARROW_UP && options[currentItemId - PREV]) {
            currentItemId -= PREV;
          }
          if (keyCode === KEYBOARD.ARROW_DOWN && options[currentItemId + NEXT]) {
            currentItemId += NEXT;
          }
          if (keyCode === KEYBOARD.ESCAPE) {
            handleCloseSelectMenu();
          }
          if (keyCode !== KEYBOARD.ESCAPE) setSelectedValue(options[currentItemId]);
        };
      } else {
        document.onkeydown = e => {
          const keyCode = e.code;

          if (keyCode === KEYBOARD.ARROW_UP || keyCode === KEYBOARD.ARROW_DOWN)
            return true;
        };
        window.onscroll = () => {
          return true;
        };
      }
    }, [disabled, isOpenItemsMenu, options]);

    const selectWidth = width ? { width } : {};

    const mainClasses = cn(className, styles.main, { [styles.main_has_header]: header });

    return (
      <div style={selectWidth} className={mainClasses} ref={mainDivRef}>
        <SelectHeader
          className={headerClassname}
          currentSelectedValue={currentSelectedValue}
          isOpenMenu={isOpenItemsMenu}
          handleSelectState={handleChangeSelectState}
        />
        <span className={styles.error}>{error}</span>

        <SelectMenu
          dropOnUp={dropOnUp}
          handleSelectedValue={handleSetSelectedValue}
          selectedValue={selectedValue}
          isOpen={isOpenItemsMenu}
          className={menuClassname}
          options={options}
        />
      </div>
    );
  },
);
