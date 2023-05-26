import { FC, ReactNode } from 'react';

import style from './AuthPageLayout.module.scss';

import { MainLogo, SimpleLink } from 'ui-kit';

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
