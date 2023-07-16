import React, { CSSProperties, FC, ReactNode, useRef } from 'react';

import cn from 'classnames';

import styles from './SelectMenu.module.scss';

interface ISelectMenuPropsType {
  isOpen: boolean;
  children: ReactNode;
  height?: string;
  className?: string;
  style?: CSSProperties;
}

export const SelectMenu: FC<ISelectMenuPropsType> = ({
  children,
  isOpen,
  height,
  className,
  style,
}) => {
  const ref = useRef<HTMLUListElement>(null);

  const inlineStyles = height ? { maxHeight: height, ...style } : { ...style };

  if (!isOpen) return null;

  const mainClassName = cn(className, styles.main);

  return (
    <ul
      id="combobox-list"
      role="listbox"
      style={inlineStyles}
      className={mainClassName}
      ref={ref}
      aria-multiselectable="false"
      aria-orientation="vertical"
    >
      {children}
    </ul>
  );
};
