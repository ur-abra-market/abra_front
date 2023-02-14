import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Logo.module.css';
import { LogoProps } from './Logo.props';

export const Logo: FC<LogoProps> = (props): JSX.Element => {
  const { href, className, ...restProps } = props;

  return (
    <div className={cn(styles.logo, className)} {...restProps}>
      {href ? <Link to={href}>Abra</Link> : 'Abra'}
    </div>
  );
};
