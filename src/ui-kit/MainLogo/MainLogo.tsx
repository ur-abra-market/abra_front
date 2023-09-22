import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './MainLogo.module.scss';

interface IMainLogo {
  className?: string;
}

export const MainLogo: FC<IMainLogo> = ({ className }): JSX.Element => {
  const titleClasses = cn(style.link, className);

  return (
    <Link to="/" className={titleClasses}>
      Abra
    </Link>
  );
};
