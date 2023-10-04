import { FC, ReactNode, useEffect, useRef } from 'react';

import cn from 'classnames';

import { useAppSelector } from 'common/hooks';
import { IAuthFooterData, LoadingStatusEnum } from 'common/types';
import { AdditionalHeaderBlock } from 'elements';
import { Footer } from 'layouts';
import { LoaderLinear, MainLogo, SimpleLink } from 'ui-kit';

import style from './AuthPageLayout.module.scss';

interface IAuthPageLayout {
  children: ReactNode;
  withHeader?: boolean;
  isMainLogoShow?: boolean;
  footerData?: IAuthFooterData[];
}

export const AuthPageLayout: FC<IAuthPageLayout> = ({
  withHeader = false,
  children,
  footerData,
  isMainLogoShow = false,
}): JSX.Element => {
  const isLoading = useAppSelector(state => state.app.loading);
  const containerRef = useRef<HTMLDivElement>(null);

  const wrapperClasses = cn(style.wrapper, {
    [style.pointer_none]: isLoading === LoadingStatusEnum.Loading,
  });

  useEffect(() => {
    const containerHeightHandler = (): void => {
      if (!containerRef.current) return;

      containerRef.current.style.height = `${window.innerHeight}px`;

      if (containerRef.current.scrollHeight - window.innerHeight >= 10) {
        containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      }
    };

    containerHeightHandler();
    window.addEventListener('resize', containerHeightHandler);

    return () => {
      window.removeEventListener('resize', containerHeightHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className={wrapperClasses}>
      {withHeader && <AdditionalHeaderBlock />}

      <div className={style.content}>
        {isLoading === LoadingStatusEnum.Loading && <LoaderLinear />}
        {isMainLogoShow && (
          <>
            <MainLogo variant="m" />
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
