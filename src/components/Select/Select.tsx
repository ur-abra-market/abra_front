import React, { FC, useEffect, useRef, useState } from 'react';

import UseOnClickOutside from '../../hooks/useOnClickOutside';
import { IOption } from '../ui-kit/Select/Select.props';

import styles from './Select.module.css';
import SelectHeader from './SelectHeader/SelectHeader';
import SelectItem from './SelectItem/SelectItem';
import SelectMenu from './SelectMenu/SelectMenu';

type SelectPropsType = {
  options: IOption[];
  defaultValue?: string;
  onChange?: () => void;
};
function useOnHoverOutside(ref: any, handler: (event: Event) => void): void {
  useEffect(() => {
    const listener = (event: Event): void => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mouseover', listener);

    return () => {
      document.removeEventListener('mouseout', listener);
    };
  }, [ref, handler]);
}

const CustomSelect: FC<SelectPropsType> = ({ options, defaultValue, onChange }) => {
  const defaultSelectedValue = defaultValue || options[0].label;
  const [selectedValue, setSelectedVale] = useState<string>(defaultSelectedValue);

  const handleSetSelectedValue = (value: string): void => {
    if (value === selectedValue) {
      handleCloseSelect();
    } else {
      setSelectedVale(value);
      if (onChange) {
        onChange();
      }
      handleCloseSelect();
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const headerClassname = isOpen ? styles.header_active : styles.header;
  const handleChangeSelectState = (): void => {
    setIsOpen(!isOpen);
  };
  const handleCloseSelect = (): void => {
    setIsOpen(false);
  };

  const squareBoxRef = useRef<HTMLDivElement>(null);

  useOnHoverOutside(squareBoxRef, () => {
    window.onscroll = () => {
      setIsOpen(false);

      return true;
    };
  });

  UseOnClickOutside(squareBoxRef, handleCloseSelect);

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
    if (isOpen) {
      const test = window.scrollY;

      window.onscroll = () => {
        window.scroll(0, test);
      };
      document.onkeydown = function (e) {
        const keyCode = e.keyCode || e.charCode;

        console.log(keyCode);
        if (keyCode === 32) e.preventDefault();
        if (keyCode === 38) e.preventDefault();
        if (keyCode === 40) e.preventDefault();
      };
    } else {
      document.onkeydown = function (e) {
        const keyCode = e.keyCode || e.charCode;

        if (keyCode === 32) return true;
        if (keyCode === 38) return true;
        if (keyCode === 40) return true;
      };
      window.onscroll = () => {
        return true;
      };
    }
  }, [isOpen]);

  return (
    <div className={styles.main} ref={squareBoxRef}>
      <SelectHeader
        className={headerClassname}
        currentSelectedValue={selectedValue}
        isOpenMenu={isOpen}
        onClick={handleChangeSelectState}
      />
      <SelectMenu isOpen={isOpen}>{mappedSelectItems}</SelectMenu>
    </div>
  );
};

export default CustomSelect;
