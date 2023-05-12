import React, { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react';

import cn from 'classnames';

import styles from './SelectMenu.module.css';

type SelectMenuPropsType = {
  isOpen: boolean;
  children: ReactNode;
  height?: string;
  className?: string;
  style?: CSSProperties;
  onChangeHeight: (height: number) => void;
};

const SelectMenu: FC<SelectMenuPropsType> = ({
  children,
  isOpen,
  height,
  className,
  style,
  onChangeHeight,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) onChangeHeight(ref.current.clientHeight);
  });

  const inlineStyles = height ? { maxHeight: height, ...style } : { ...style };

  if (!isOpen) return null;

  const mainClassName = cn(className, styles.main);

  return (
    <div style={inlineStyles} className={mainClassName} ref={ref}>
      {children}
    </div>
  );
};

export default SelectMenu;
