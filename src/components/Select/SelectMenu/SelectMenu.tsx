import React, { FC, ReactNode } from 'react';

import styles from './SelectMenu.module.css';

type SelectMenuPropsType = {
  isOpen: boolean;
  children: ReactNode;
  height?: string;
};

const SelectMenu: FC<SelectMenuPropsType> = ({ children, isOpen, height }) => {
  const maxHeight = height ? { maxHeight: height } : {};

  if (!isOpen) return null;

  return (
    <div style={maxHeight} className={styles.main}>
      {children}
    </div>
  );
};

export default SelectMenu;
