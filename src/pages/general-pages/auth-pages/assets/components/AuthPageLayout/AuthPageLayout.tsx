import { FC, ReactNode } from 'react';

import cn from 'classnames';

import { useAppSelector } from '../../../../../../common/hooks';
import { LoadingStatusEnum } from '../../../../../../common/types';

import style from './AuthPageLayout.module.scss';

import { Footer } from 'layouts/Footer';
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
        [style.pointer_none]: isLoading === LoadingStatusEnum.Loading,
      })}
    >
      <div className={style.content}>
        {isLoading === LoadingStatusEnum.Loading && <LoaderLinear />}
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
      <Footer variant="white" />
    </div>
  );
};
