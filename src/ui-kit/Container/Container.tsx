import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Container.module.scss';

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: FC<ContainerProps> = ({ children, className, ...restProps }) => {
  return (
    <div className={cn(styles.container, className)} {...restProps}>
      {children}
    </div>
  );
};
