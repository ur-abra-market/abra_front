import React, { forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './Select.module.scss';
import { SelectHeader } from './SelectHeader/SelectHeader';
import { SelectMenu } from './SelectMenu/SelectMenu';

import { useOnClickOutside, useOnHoverOutside } from 'common/hooks';

const keyboardKeys = {
  ENTER_KEYBOARD: 'Enter',
  ARROW_UP_KEYBOARD: 'ArrowUp',
  ARROW_DOWN_KEYBOARD: 'ArrowDown',
  ESCAPE_KEYBOARD: 'Escape',
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
  padding?: string;
  disabled?: boolean;
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
      padding = '14px',
      defaultValue,
      disabled,
    }: ISelect,
    ref,
  ) => {
    const placeholderObj = placeholder
      ? { label: { text: placeholder }, value: placeholder }
      : null;

    const defaultSelectedValue = placeholderObj || options[0];
    const [selectedValue, setSelectedVale] =
      useState<ISelectOption>(defaultSelectedValue);

    const currentSelectedValue = controlledValue || selectedValue;

    useEffect(() => {
      if (defaultValue) {
        const currentValue = options.find(el => el.value === defaultValue);

        if (currentValue) setSelectedVale(currentValue);
      }
    }, [defaultValue, options]);

    const handleSetSelectedValue = (option: ISelectOption): void => {
      if (option !== currentSelectedValue) {
        if (controlledValue) {
          setSelectedVale(controlledValue);
        } else {
          setSelectedVale(option);
        }
        if (onChange) {
          onChange(option);
        }
      }
      handleCloseSelectMenu();
    };

    const [isOpenItemsMenu, setIsOpenItemsMenu] = useState(false);

    const headerClassname = cn(styles.header, {
      [styles.opened_menu_up_pos_header]:
        header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active]: header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active_up]: header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.header_active]: header && menuItemsPosition === 'down' && isOpenItemsMenu,
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
      setIsOpenItemsMenu(false);
    };
    const mainDivRef = useOnClickOutside(handleCloseSelectMenu);

    useOnHoverOutside(mainDivRef, () => {
      window.onscroll = () => {
        setIsOpenItemsMenu(false);

        return true;
      };
    });

    // disable scrolling by click on space or arrows on keyboard
    useEffect(() => {
      let currentItemId = 0;

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
          if (
            keyCode === keyboardKeys.ENTER_KEYBOARD ||
            keyCode === keyboardKeys.ESCAPE_KEYBOARD
          ) {
            handleCloseSelectMenu();
          }

          if (
            keyCode === keyboardKeys.ARROW_UP_KEYBOARD &&
            options[currentItemId - PREV]
          ) {
            e.preventDefault();
            currentItemId -= PREV;
          }
          if (
            keyCode === keyboardKeys.ARROW_DOWN_KEYBOARD &&
            options[currentItemId + NEXT]
          ) {
            e.preventDefault();
            currentItemId += NEXT;
          }

          setSelectedVale(options[currentItemId]);
        };
      } else {
        document.onkeydown = e => {
          const keyCode = e.code;

          if (
            keyCode === keyboardKeys.ARROW_UP_KEYBOARD ||
            keyCode === keyboardKeys.ARROW_DOWN_KEYBOARD
          )
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
          handleSelectedValue={handleSetSelectedValue}
          selectedValue={selectedValue}
          isOpen={isOpenItemsMenu}
          className={menuClassname}
          options={options}
          padding={padding}
        />
      </div>
    );
  },
);
