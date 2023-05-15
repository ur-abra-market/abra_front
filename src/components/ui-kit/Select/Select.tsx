import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import UseOnClickOutside from '../../../hooks/useOnClickOutside';
import useOnHoverOutside from '../../../hooks/useOnHoverOutside';

import styles from './Select.module.css';
import SelectHeader from './SelectHeader/SelectHeader';
import SelectItem from './SelectItem/SelectItem';
import SelectMenu from './SelectMenu/SelectMenu';

const SPACE_KEYBOARD = 'Space';
const ENTER_KEYBOARD = 'Enter';
const ARROW_UP_KEYBOARD = 'ArrowUp';
const ARROW_DOWN_KEYBOARD = 'ArrowDown';

const PREV = 1;
const NEXT = 1;

export type SelectProps = {
  options: IOption[];
  onChange?: (value: IOption) => void;
  error?: string;
  children?: ReactNode;
  placeholder?: string;
  menuHeight?: string;
  width?: string;
  className?: string;
  menuItemsPosition?: PositionType;
  header?: boolean;
  padding?: string;
};

export type PositionType = 'up' | 'down';

export type IOption = {
  label: string;
  value: string | number;
};

/**
 *
 * Props:
 * - To add header use --> Header={true}
 *
 *
 */
export const Select: FC<SelectProps> = ({
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
  padding = '15px',
}) => {
  const placeholderObj = placeholder ? { label: placeholder, value: placeholder } : null;

  const defaultSelectedValue = placeholderObj || options[0];
  const [selectedValue, setSelectedVale] = useState<IOption>(defaultSelectedValue);

  const handleSetSelectedValue = (incomingData: IOption): void => {
    if (incomingData === selectedValue) {
      //
    } else {
      setSelectedVale(incomingData);
      if (onChange) {
        onChange(incomingData);
      }
    }
    handleCloseSelectMenu();
  };

  const [isOpen, setIsOpen] = useState(false);
  let headerClassname = styles.header;
  let menuClassname;

  if (header && menuItemsPosition === 'down') {
    headerClassname = isOpen ? styles.header_active : styles.header;
  }
  if (header && menuItemsPosition === 'up') {
    headerClassname = isOpen
      ? cn(styles.header_active, styles.header_active_up)
      : styles.header;
  }
  if (header && menuItemsPosition === 'up' && isOpen) {
    menuClassname = styles.opened_menu_up_pos;
    headerClassname = cn(headerClassname, styles.opened_menu_up_pos_header);
  }
  if (!header) {
    menuClassname = cn(menuClassname, styles.closed_menu);
  }

  const handleChangeSelectState = (): void => {
    setIsOpen(!isOpen);
  };
  const handleCloseSelectMenu = (): void => {
    setIsOpen(false);
  };

  const mainDivRef = useRef<HTMLDivElement>(null);

  useOnHoverOutside(mainDivRef, () => {
    window.onscroll = () => {
      setIsOpen(false);

      return true;
    };
  });

  UseOnClickOutside(mainDivRef, handleCloseSelectMenu);

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

    if (isOpen) {
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
  }, [isOpen, options]);

  const selectWidth = width ? { width } : {};
  const [currentMenuHeight, setCurrentMenuHeight] = useState(0);
  const handleGetMenuHeight = (height: number): void => {
    setCurrentMenuHeight(height);
  };

  const menuStyles: { top: string } = {
    top: menuItemsPosition === 'up' ? `-${currentMenuHeight}px` : 'unset',
  };

  const HeaderStyles: { padding: string } = {
    padding,
  };

  return (
    <div style={selectWidth} className={cn(styles.main, className)} ref={mainDivRef}>
      <SelectHeader
        menuItemsPosition={menuItemsPosition}
        className={headerClassname}
        currentSelectedValue={selectedValue}
        isOpenMenu={isOpen}
        onClick={handleChangeSelectState}
        style={HeaderStyles}
      />
      <span className={styles.error}>{error}</span>
      <SelectMenu
        isOpen={isOpen}
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
};

export default Select;
