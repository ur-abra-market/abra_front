import React, { FC, ReactNode } from 'react';

import styles from './SelectMenu.module.css';

type SelectMenuPropsType = {
  isOpen: boolean;
  children: ReactNode;
};

const SelectMenu: FC<SelectMenuPropsType> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return <div className={styles.main}>{children}</div>;
};

export default SelectMenu;
