import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks';
import { LocationAndCurrencySelection } from '../../components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import HeaderNavMenu from '../../old-components/HeaderNavMemu';
import { Container } from '../../ui-kit';

import style from './Footer.module.css';
import { FooterProps } from './Footer.props';

import { MainLogo } from 'ui-kit';

const Footer: FC<FooterProps> = ({ className, variant }): JSX.Element => {
  const routs = ['personal-account', 'product', 'order-history', ''];
  const { pathname } = useLocation();
  const isSupplier = useAppSelector(state => state.auth.userRole);
  const showHeadNav =
    isSupplier === 'seller' && routs.some(el => el === pathname.split('/')[1]);

  return (
    <div className={cn(style.container, className)}>
      {showHeadNav && (
        <Container>
          <div className={style.top}>
            <MainLogo className={style.logo_font_size} />
            <div className={style.inner}>
              <HeaderNavMenu className={cn(style.nav, style.nav_menu)} />
              <LocationAndCurrencySelection className={style.selects} />
            </div>
          </div>
        </Container>
      )}

      <div
        className={cn(style.footer, {
          [style.footer_white]: variant === 'white',
        })}
      >
        <Container>
          <div className={style.flex_box}>
            {variant === 'default' ? (
              <>
                <div className={style.links_default}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? style.is_disabled : style.link
                    }
                    to="/terms_and_conditions"
                  >
                    Terms & conditions
                  </NavLink>{' '}
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? style.is_disabled : style.link
                    }
                    to="/privacy_policy"
                  >
                    Privacy policy
                  </NavLink>
                </div>
                <div className={style.copyright}>
                  <span>© Copyright 2023</span>
                </div>
              </>
            ) : (
              <div className={style.links_white}>
                © 2022 Abra.{' '}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.is_disabled_white : style.link_white
                  }
                  to="/terms_and_conditions"
                >
                  Terms & conditions
                </NavLink>{' '}
                and&nbsp;
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.is_disabled_white : style.link_white
                  }
                  to="/privacy_policy"
                >
                  Privacy policy
                </NavLink>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
