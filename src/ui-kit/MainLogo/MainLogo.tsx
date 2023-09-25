import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './MainLogo.module.scss';

interface IMainLogo {
  className?: string;
  variant?: 'm' | 's';
}

export const MainLogo: FC<IMainLogo> = ({ className, variant = 's' }): JSX.Element => {
  const titleClasses = cn(style.link, style[variant], className);

  return (
    <Link to="/" className={titleClasses}>
      Abra
    </Link>
  );
};
