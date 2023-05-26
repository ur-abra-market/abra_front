import React, { FC, ReactNode } from 'react';

import { MainLogo, SimpleLink } from '../../../../../../ui-kit';

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
      <SimpleLink to={footerLink} color="accent">
        {footerTitle}
      </SimpleLink>
    </div>
  );
};
