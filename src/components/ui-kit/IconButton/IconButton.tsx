import { FC } from 'react';

import cn from 'classnames';

import styles from './IconButton.module.css';
import { IconButtonProps } from './IconButton.props';

export const IconButton: FC<IconButtonProps> = props => {
  const { className, children, ...restProps } = props;

  return (
    <button type="button" className={cn(styles.button, className)} {...restProps}>
      {children}
    </button>
  );
};
