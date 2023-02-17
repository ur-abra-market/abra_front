import React, { FC } from 'react';

import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { Container } from '../Container/Container';
import HeaderNavMenu from '../HeaderNavMemu/HeaderNavMenu';
import { LocationAndCurrencySelection } from '../new-components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { Logo } from '../new-components/Logo/Logo';

import style from './Footer.module.css';
import { FooterProps } from './Footer.props';

const Footer: FC<FooterProps> = (props): JSX.Element => {
  const { className } = props;
  const routs = ['personal-account', 'order-history', ''];
  const { pathname } = useLocation();
  const showHeadNav = routs.some(el => el === pathname.split('/')[1]);

  return (
    <div className={cn(style.footer, className)}>
      {showHeadNav && (
        <Container>
          <div className={style.top}>
            <Logo href="/" size="sm" color="black" />
            <div className={style.inner}>
              <HeaderNavMenu className={style.nav} />
              <LocationAndCurrencySelection className={style.selects} />
            </div>
          </div>
        </Container>
      )}

      <div className={style.bottom}>
        <Container>
          <div className={style.flex_box}>
            <div className={style.links}>
              <Link to="/terms&conditions">Terms & Conditions</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
            <div className={style.copyright}>© Copyright 2022</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
