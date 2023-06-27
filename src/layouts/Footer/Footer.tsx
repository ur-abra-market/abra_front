import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../routes';
import { userRoleSelector } from '../../store/reducers/authSlice';

import style from './Footer.module.scss';

import { Top } from '.';

interface IFooter
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant: 'white' | 'default';
}

export const Footer: FC<IFooter> = ({ className, variant }): JSX.Element => {
  const routesToShow = new Set(['personal_account', 'product', 'order_history', '']);
  const { pathname } = useLocation();
  const userRole = useAppSelector(userRoleSelector);
  const isShowTopNav = userRole === 'seller' && routesToShow.has(pathname.split('/')[1]);

  const footerClasses = cn(style.footer, {
    [style.footer_white]: variant === 'white',
  });

  return (
    <div className={cn(style.wrapper, className)}>
      {isShowTopNav && <Top />}

      <div className={footerClasses}>
        <div className={style.container}>
          <div className={style.flex_box}>
            {variant === 'default' ? (
              <>
                <div className={style.links_default}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? style.is_disabled : style.link
                    }
                    to={TERMS_AND_CONDITIONS}
                  >
                    Terms & conditions
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? style.is_disabled : style.link
                    }
                    to={PRIVACY_POLICY}
                  >
                    Privacy policy
                  </NavLink>
                </div>
                <div className={style.copyright}>
                  <span>&#169; Copyright 2023</span>
                </div>
              </>
            ) : (
              <div className={style.links_white}>
                &#169; 2022 Abra.
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.is_disabled_white : style.link_white
                  }
                  to={TERMS_AND_CONDITIONS}
                >
                  Terms & conditions
                </NavLink>
                and&nbsp;
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.is_disabled_white : style.link_white
                  }
                  to={PRIVACY_POLICY}
                >
                  Privacy policy
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
