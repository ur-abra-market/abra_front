import React, { FC } from 'react';

import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks';
import { LocationAndCurrencySelection } from '../../components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import HeaderNavMenu from '../../old-components/HeaderNavMemu';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../routes';
import { Container } from '../../ui-kit';

import style from './Footer.module.css';
import { FooterProps } from './Footer.props';

import { MainLogo } from 'ui-kit';

const Footer: FC<FooterProps> = (props): JSX.Element => {
  const { className } = props;
  const routs = ['personal-account', 'product', 'order-history', ''];
  const { pathname } = useLocation();
  const isSupplier = useAppSelector(state => state.auth.userRole);
  const showHeadNav =
    isSupplier === 'seller' && routs.some(el => el === pathname.split('/')[1]);

  return (
    <div className={cn(style.footer, className)}>
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

      <div className={style.bottom}>
        <Container>
          <div className={style.flex_box}>
            <div className={style.links}>
              <Link to={TERMS_AND_CONDITIONS}>Terms & Conditions</Link>
              <Link to={PRIVACY_POLICY}>Privacy Policy</Link>
            </div>
            <div className={style.copyright}>
              <span>© Copyright 2023</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
