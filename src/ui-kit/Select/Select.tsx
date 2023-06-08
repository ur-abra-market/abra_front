import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { useOnClickOutside, useOnHoverOutside } from '../../common/hooks';

import styles from './Select.module.scss';
import { SelectHeader } from './SelectHeader/SelectHeader';
import { SelectItem } from './SelectItem/SelectItem';
import { SelectMenu } from './SelectMenu/SelectMenu';

const SPACE_KEYBOARD = 'Space';
const ENTER_KEYBOARD = 'Enter';
const ARROW_UP_KEYBOARD = 'ArrowUp';
const ARROW_DOWN_KEYBOARD = 'ArrowDown';

const PREV = 1;
const NEXT = 1;

export type SelectPositionType = 'up' | 'down';

export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface ISelect {
  options: ISelectOption[];
  onChange?: (value: ISelectOption) => void;
  error?: string;
  children?: ReactNode;
  placeholder?: string;
  menuHeight?: string;
  defaultValue?: string;
  width?: string;
  className?: string;
  menuItemsPosition?: SelectPositionType;
  header?: boolean; // to add header use --> header={true}
  padding?: string;
}

export const Select = forwardRef(
  (
    {
      options,
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
    }: ISelect,
    ref,
  ) => {
    const placeholderObj = placeholder
      ? { label: placeholder, value: placeholder }
      : null;

    const defaultSelectedValue = placeholderObj || options[0];
    const [selectedValue, setSelectedVale] =
      useState<ISelectOption>(defaultSelectedValue);

    useEffect(() => {
      if (defaultValue) {
        const currentValue = options.find(el => el.label === defaultValue);

        if (currentValue) setSelectedVale(currentValue);
      }
    }, [defaultValue, options]);

    const handleSetSelectedValue = (incomingData: ISelectOption): void => {
      if (incomingData !== selectedValue) {
        setSelectedVale(incomingData);
        if (onChange) {
          onChange(incomingData);
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
    });
    const menuClassname = cn({
      [styles.closed_menu]: !header,
      [styles.opened_menu_up_pos]:
        header && menuItemsPosition === 'up' && isOpenItemsMenu,
      [styles.menu_up_pos]: menuItemsPosition === 'up' && isOpenItemsMenu,
    });

    const handleChangeSelectState = (): void => {
      setIsOpenItemsMenu(!isOpenItemsMenu);
    };
    const handleCloseSelectMenu = (): void => {
      setIsOpenItemsMenu(false);
    };

    const mainDivRef = useRef<HTMLDivElement>(null);

    useOnHoverOutside(mainDivRef, () => {
      window.onscroll = () => {
        setIsOpenItemsMenu(false);

        return true;
      };
    });

    useOnClickOutside(mainDivRef, handleCloseSelectMenu);

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
    }, [isOpenItemsMenu, options]);

    const selectWidth = width ? { width } : {};
    const [currentMenuHeight, setCurrentMenuHeight] = useState(0);
    const handleGetMenuHeight = (height: number): void => {
      setCurrentMenuHeight(height);
    };

    const menuStyles: { top: string } = {
      top: menuItemsPosition === 'up' ? `-${currentMenuHeight}px` : 'unset',
    };

    const mainClasses = cn(styles.main, className, { [styles.main_has_header]: header });

    return (
      <div style={selectWidth} className={mainClasses} ref={mainDivRef}>
        <SelectHeader
          menuItemsPosition={menuItemsPosition}
          className={headerClassname}
          currentSelectedValue={selectedValue}
          isOpenMenu={isOpenItemsMenu}
          onClick={handleChangeSelectState}
        />
        <span className={styles.error}>{error}</span>

        <SelectMenu
          isOpen={isOpenItemsMenu}
          height={menuHeight}
          style={menuStyles}
          className={menuClassname}
          onChangeHeight={handleGetMenuHeight}
        >
          {mappedSelectItems}
          {children}
        </SelectMenu>
      </div>
    );
  },
);
