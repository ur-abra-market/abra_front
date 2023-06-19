import { FC, ReactNode } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../../../common/hooks';
import { LoadingStatus } from '../../../../../../common/types';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../../../../../routes';

import style from './AuthPageLayout.module.scss';

import { LoaderLinear, MainLogo, SimpleLink } from 'ui-kit';

interface IAuthPageLayout {
  children: ReactNode;
  isMainLogoShow?: boolean;
  footerLink?: string;
  footerTitle?: string;
}

export const AuthPageLayout: FC<IAuthPageLayout> = ({
  children,
  footerLink,
  footerTitle,
  isMainLogoShow = false,
}): JSX.Element => {
  const isLoading = useAppSelector(state => state.app.loading);

  return (
    <div
      className={cn(style.wrapper, {
        [style.pointer_none]: isLoading === LoadingStatus.Loading,
      })}
    >
      <div className={style.content}>
        {isLoading === LoadingStatus.Loading && <LoaderLinear />}
        {isMainLogoShow && (
          <>
            <MainLogo />
            <div className={style.subtitle}>Start buying in bulk now!</div>
          </>
        )}
        {children}
        {footerLink && footerTitle && (
          <SimpleLink to={footerLink} color="accent">
            {footerTitle}
          </SimpleLink>
        )}
      </div>
      <div className={style.footer}>
        © 2022 Abra. <Link to={TERMS_AND_CONDITIONS}>Terms & conditions</Link> and&nbsp;
        <Link to={PRIVACY_POLICY}>Privacy policy</Link>
      </div>
    </div>
  );
};
