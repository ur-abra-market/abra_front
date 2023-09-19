import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './MainLogo.module.scss';

import { Title } from 'ui-kit/Title/Title';

interface IMainLogo {
  className?: string;
}

export const MainLogo: FC<IMainLogo> = ({ className }): JSX.Element => {
  const titleClasses = cn(style.title, className);

  return (
    <Title font="m" as="h1" className={titleClasses}>
      <Link to="/" className={style.link}>
        Abra
      </Link>
    </Title>
  );
};
