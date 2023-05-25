import React, { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { MainLogo } from '../../../../../../ui-kit';

import style from './AuthPageLayout.module.scss';

interface IAuthPageLayout {
  children: ReactNode;
  footerLink: string;
  footerTitle: string;
}

export const AuthPageLayout: FC<IAuthPageLayout> = ({
  children,
  footerLink,
  footerTitle,
}): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <MainLogo />
      <div className={style.subtitle}>Start buying in bulk now!</div>
      {children}
      <Link to={footerLink}>{footerTitle}</Link>
    </div>
  );
};