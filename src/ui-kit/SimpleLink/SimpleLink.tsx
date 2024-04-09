import { FC, ReactNode } from 'react';

import cn from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import styles from './SimpleLink.module.scss';

export interface ISimpleLink extends LinkProps {
  color?: 'accent' | 'default';
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  variant?: 'link' | 'button';
}

export const SimpleLink: FC<ISimpleLink> = ({
  to,
  className,
  color = 'accent',
  children,
  disabled,
  variant = 'link',
  ...restProps
}) => {
  const simpleLinkClasses = cn(className, styles.link, { [styles.disabled]: disabled }, [
    styles[color],
    styles[variant],
  ]);

  return (
    <Link to={to} className={simpleLinkClasses} {...restProps}>
      {children}
    </Link>
  );
};
