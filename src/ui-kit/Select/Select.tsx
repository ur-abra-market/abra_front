import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './Select.module.scss';
import { SelectHeader } from './SelectHeader/SelectHeader';
import { SelectItem } from './SelectItem/SelectItem';
import { SelectMenu } from './SelectMenu/SelectMenu';

import { useOnClickOutside, useOnHoverOutside } from 'common/hooks';

const SPACE_KEYBOARD = 'Space';
const ENTER_KEYBOARD = 'Enter';
const ARROW_UP_KEYBOARD = 'ArrowUp';
const ARROW_DOWN_KEYBOARD = 'ArrowDown';

const PREV = 1;
const NEXT = 1;

export type SelectPositionType = 'up' | 'down';

export interface ISelectOption {
  label: string;
  value: any;
}

export interface ISelect {
  options: ISelectOption[];
  controlledValue?: ISelectOption;
  onChange?: (value: ISelectOption) => void;
  error?: string;
  children?: ReactNode;
  placeholder?: string;
  menuHeight?: string;
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
      children,
      menuHeight = '200px',
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
      ? { label: placeholder, value: placeholder }
      : null;

    const defaultSelectedValue = placeholderObj || options[0];
    const [selectedValue, setSelectedVale] =
      useState<ISelectOption>(defaultSelectedValue);

    const currentSelectedValue =
      controlledValue !== undefined ? controlledValue : selectedValue;

    useEffect(() => {
      if (defaultValue) {
        const currentValue = options.find(el => el.value === defaultValue);

        if (currentValue) setSelectedVale(currentValue);
      }
    }, [defaultValue, options]);

    const handleSetSelectedValue = (option: ISelectOption): void => {
      if (option !== currentSelectedValue) {
        if (controlledValue !== undefined) {
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

    // if the menu is open and the user tries to scroll behind the menu, then we add the ability to scroll and hide the menu
    const mappedSelectItems = options.map(el => (
      <SelectItem
        key={el.value}
        value={el}
        onClick={handleSetSelectedValue}
        currentSelectedItem={selectedValue}
        style={{ padding }}
      />
    ));

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

          if (keyCode === ENTER_KEYBOARD) {
            handleCloseSelectMenu();
          }

          if (keyCode === ARROW_UP_KEYBOARD && options[currentItemId - PREV]) {
            e.preventDefault();
            currentItemId -= PREV;
          }
          if (keyCode === ARROW_DOWN_KEYBOARD && options[currentItemId + NEXT]) {
            e.preventDefault();
            currentItemId += NEXT;
          }

          if (keyCode === SPACE_KEYBOARD) e.preventDefault();

          setSelectedVale(options[currentItemId]);
        };
      } else {
        document.onkeydown = e => {
          const keyCode = e.code;

          if (keyCode === SPACE_KEYBOARD) return true;
          if (keyCode === ARROW_UP_KEYBOARD) return true;
          if (keyCode === ARROW_DOWN_KEYBOARD) return true;
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
          menuItemsPosition={menuItemsPosition}
          className={headerClassname}
          currentSelectedValue={currentSelectedValue}
          isOpenMenu={isOpenItemsMenu}
          onClick={handleChangeSelectState}
        />
        <span className={styles.error}>{error}</span>

        <SelectMenu
          isOpen={isOpenItemsMenu}
          height={menuHeight}
          className={menuClassname}
        >
          {mappedSelectItems}
          {children}
        </SelectMenu>
      </div>
    );
  },
);
