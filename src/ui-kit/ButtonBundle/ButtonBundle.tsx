import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import cn from 'classnames';

import styles from './ButtonBundle.module.scss';

export interface IButtonBundle
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {
  className?: string;
  children: string;
  color?: 'default' | 'active';
}

export const ButtonBundle: FC<IButtonBundle> = (props): JSX.Element => {
  const { className, color = 'default', children, ...resProps } = props;

  return (
    <button
      type="button"
      className={cn(
        styles.button,
        {
          [styles.default]: color === 'default',
          [styles.active]: color === 'active',
        },
        className,
      )}
      {...resProps}
    >
      {' '}
      {children}
    </button>
  );
};
