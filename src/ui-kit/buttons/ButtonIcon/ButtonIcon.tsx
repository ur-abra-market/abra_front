import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from 'classnames';

import styles from './ButtonIcon.module.css';

export interface IButtonIcon
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const ButtonIcon: FC<IButtonIcon> = ({ className, children, ...restProps }) => {
  return (
    <button type="button" className={cn(styles.button, className)} {...restProps}>
      {children}
    </button>
  );
};
