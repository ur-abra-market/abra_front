import { FC, ReactNode } from 'react';

import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { LoadingStatus } from '../../../../../../common/types/enums/status.enum';

import style from './AuthPageLayout.module.scss';

import { LoaderLinear, MainLogo, SimpleLink } from 'ui-kit';

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
  const isLoading = useAppSelector(state => state.app.loading);

  return (
    <div className={style.wrapper}>
      {isLoading === LoadingStatus.Loading && <LoaderLinear />}
      <MainLogo />
      <div className={style.subtitle}>Start buying in bulk now!</div>
      {children}
      <SimpleLink to={footerLink} color="accent">
        {footerTitle}
      </SimpleLink>
    </div>
  );
};
