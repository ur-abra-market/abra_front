import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Top } from '.';

import { useAppSelector } from 'common/hooks';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from 'routes';
import { userRoleSelector } from 'store/reducers/authSlice';

import style from './Footer.module.scss';

interface IFooter
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant: 'white' | 'black';
  className?: string;
}

export const Footer: FC<IFooter> = ({ className, variant }): JSX.Element => {
  const routesToShow = new Set(['cart', 'product', 'favorites', '']);
  const { pathname } = useLocation();
  const userRole = useAppSelector(userRoleSelector);
  const isShowTopNav = userRole === 'seller' && routesToShow.has(pathname.split('/')[1]);

  const footerClasses = cn(style.footer_bottom_wrapper, {
    [style.footer_bottom_black]: variant === 'black',
    [style.footer_bottom_white]: variant === 'white',
  });

  return (
    <footer className={className || ''}>
      {isShowTopNav && <Top />}

      <div className={footerClasses}>
        <div className={style.footer_bottom}>
          <p className={style.copyright}>&#169; 2023 Abra.</p>

          <NavLink className={style.link} to={TERMS_AND_CONDITIONS}>
            Terms & conditions
          </NavLink>

          <span className={style.links_separator}>&nbsp;and&nbsp;</span>

          <NavLink className={style.link} to={PRIVACY_POLICY}>
            Privacy policy
          </NavLink>
        </div>
      </div>
    </footer>
  );
};
