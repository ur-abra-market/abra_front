import { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { LoadingStatus } from '../../../../../../common/types/enums/status.enum';

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
    <div className={style.wrapper}>
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
        © 2022 Abra. <Link to="/terms&conditions">Terms & conditions</Link> and{' '}
        <Link to="/privacy&policy">Privacy policy</Link>
      </div>
    </div>
  );
};
