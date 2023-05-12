import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import UseOnClickOutside from '../../hooks/useOnClickOutside';
import useOnHoverOutside from '../../hooks/useOnHoverOutside';

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
  position?: PositionType;
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
 * - To set select menu height use --> menuHeight={"100px"} you can use any string ("100px","100%")
 * - To position the menu above or below the header --> use position={"up" or "down"}
 *
 */
const Select: FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  error,
  children,
  menuHeight = '200px',
  width,
  className,
  position = 'down',
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

  if (header && position === 'down') {
    headerClassname = isOpen ? styles.header_active : styles.header;
  }
  if (header && position === 'up') {
    headerClassname = isOpen
      ? cn(styles.header_active, styles.header_active_up)
      : styles.header;
  }

  const handleChangeSelectState = (): void => {
    setIsOpen(!isOpen);
  };
  const handleCloseSelectMenu = (): void => {
    setIsOpen(false);
  };

  const squareBoxRef = useRef<HTMLDivElement>(null);

  useOnHoverOutside(squareBoxRef, () => {
    window.onscroll = () => {
      setIsOpen(false);

      return true;
    };
  });

  UseOnClickOutside(squareBoxRef, handleCloseSelectMenu);

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

  // CHANGE TYPE!!
  const menuStyles: any = {
    top: position === 'up' ? `-${currentMenuHeight}px` : 'unset',
    borderRadius: header ? undefined : '8px',
    boxShadow: header
      ? undefined
      : 'rgba(0, 0, 0, 0.2) 7px 6px 5px,rgba(0, 0, 0, 0.2) -4px 6px 5px,rgba(0, 0, 0, 0.2) 0 -4px 5px',
  };

  const HeaderStyles: any = {
    padding,
  };

  if (header && position === 'up' && isOpen) {
    menuStyles.borderBottomRightRadius = 'unset';
    menuStyles.borderBottomLeftRadius = 'unset';
    menuStyles.borderTopLeftRadius = '8px';
    menuStyles.borderTopRightRadius = '8px';
    menuStyles.boxShadow =
      'rgba(0, 0, 0, 0.2) -4px -2px 5px, rgba(0, 0, 0, 0.2) 4px -2px 5px';
    HeaderStyles.boxShadow =
      'rgba(0, 0, 0, 0.2) 4px -6px 5px, rgba(0, 0, 0, 0.2) -4px -6px 5px';
  }

  return (
    <div style={selectWidth} className={cn(styles.main, className)} ref={squareBoxRef}>
      <SelectHeader
        position={position}
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
        onChangeHeight={handleGetMenuHeight}
      >
        {mappedSelectItems}
        {children}
      </SelectMenu>
    </div>
  );
};

export default Select;
