import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import style from './Footer.module.scss';

import { Top } from '.';

import { useAppSelector } from 'common/hooks';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from 'routes';
import { userRoleSelector } from 'store/reducers/authSlice';

interface IFooter
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant: 'white' | 'default';
}

export const Footer: FC<IFooter> = ({ className, variant }): JSX.Element => {
  const routesToShow = new Set(['cart', 'product', 'favorites', '']);
  const { pathname } = useLocation();
  const userRole = useAppSelector(userRoleSelector);
  const isShowTopNav = userRole === 'seller' && routesToShow.has(pathname.split('/')[1]);

  const footerClasses = cn(style.footer, {
    [style.footer_white]: variant === 'white',
  });

  const linksClasses = cn({
    [style.links]: variant === 'default',
    [style.links_white]: variant === 'white',
  });

  const navLinkClasses = cn(style.link, {
    [style.link_white]: variant === 'white',
  });

  return (
    <div className={cn(style.wrapper, className)}>
      {isShowTopNav && <Top />}

      <div className={footerClasses}>
        <div className={style.container}>
          <div className={style.links_container}>
            {variant === 'default' && (
              <div className={style.copyright}>
                <p>&#169; Abra 2023</p>
              </div>
            )}

            <div className={linksClasses}>
              {variant === 'white' && <p>&#169; 2023 Abra.</p>}
              <NavLink className={navLinkClasses} to={TERMS_AND_CONDITIONS}>
                Terms & conditions
              </NavLink>

              {variant === 'white' && (
                <span className={style.link_separator}>and&nbsp;</span>
              )}
              <NavLink className={navLinkClasses} to={PRIVACY_POLICY}>
                Privacy policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
