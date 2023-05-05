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

export type SelectPropsType = {
  options: OptionType[];
  onChange?: (value: OptionType) => void;
  error?: string;
  children?: ReactNode;
  placeholder?: string;
  menuHeight?: string;
  width?: string;
  className?: string;
};

export type OptionType = {
  label: string;
  value: string | number;
};

const CustomSelect: FC<SelectPropsType> = ({
  options,
  placeholder,
  onChange,
  error,
  children,
  menuHeight,
  width,
  className,
}) => {
  const placeholderObj = placeholder ? { label: placeholder, value: placeholder } : null;

  const defaultSelectedValue = placeholderObj || options[0];
  const [selectedValue, setSelectedVale] = useState<OptionType>(defaultSelectedValue);

  const handleSetSelectedValue = (incomingData: OptionType): void => {
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
  const headerClassname = isOpen ? styles.header_active : styles.header;
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

  return (
    <div style={selectWidth} className={cn(styles.main, className)} ref={squareBoxRef}>
      <SelectHeader
        className={headerClassname}
        currentSelectedValue={selectedValue}
        isOpenMenu={isOpen}
        onClick={handleChangeSelectState}
      />
      <span className={styles.error}>{error}</span>
      <SelectMenu isOpen={isOpen} height={menuHeight}>
        {mappedSelectItems}
        {children}
      </SelectMenu>
    </div>
  );
};

export default CustomSelect;
