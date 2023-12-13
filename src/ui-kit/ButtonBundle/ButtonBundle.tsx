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

export const ButtonBundle: FC<IButtonBundle> = ({
  className,
  color = 'default',
  children,
  ...resProps
}): JSX.Element => {
  const buttonBundleClasses = cn(
    styles.button,
    {
      [styles.default]: color === 'default',
      [styles.active]: color === 'active',
    },
    className,
  );

  return (
    <button type="button" className={buttonBundleClasses} {...resProps}>
      {children}
    </button>
  );
};
