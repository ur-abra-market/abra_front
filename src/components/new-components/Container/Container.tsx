import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Container.module.css';

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
export const Container: FC<ContainerProps> = props => {
  const { children, className, ...restProps } = props;

  return (
    <div className={cn(styles.container, className)} {...restProps}>
      {children}
    </div>
  );
};
