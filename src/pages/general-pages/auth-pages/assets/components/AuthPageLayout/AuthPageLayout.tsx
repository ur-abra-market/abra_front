import { FC, ReactNode } from 'react';

import cn from 'classnames';

import style from './AuthPageLayout.module.scss';

import { useAppSelector } from 'common/hooks';
import { IAuthFooterData, LoadingStatusEnum } from 'common/types';
import { Footer } from 'layouts';
import { LoaderLinear, MainLogo, SimpleLink } from 'ui-kit';

interface IAuthPageLayout {
  children: ReactNode;
  isMainLogoShow?: boolean;
  footerData?: IAuthFooterData[];
}

export const AuthPageLayout: FC<IAuthPageLayout> = ({
  children,
  footerData,
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
        <div className={style.footer_wrapper}>
          {footerData?.map(el => (
            <SimpleLink
              disabled={isLoading === LoadingStatusEnum.Loading}
              key={el.link}
              to={el.link}
              color="accent"
            >
              {el.title}
            </SimpleLink>
          ))}
        </div>
      </div>
      <Footer variant="white" />
    </div>
  );
};
