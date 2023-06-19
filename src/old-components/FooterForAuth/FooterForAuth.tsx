import React, { MouseEvent } from 'react';

import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { TERMS_AND_CONDITIONS, PRIVACY_POLICY } from '../../routes';
import { Container } from '../../ui-kit';

import style from './FooterForAuth.module.css';

export const FooterForAuth = (): JSX.Element => {
  const location = useLocation();
  const locationPathName = location.pathname;

  const onClickHandler = (event: MouseEvent<HTMLAnchorElement>, path: string): void => {
    if (path === locationPathName) {
      event.preventDefault();
    }
  };

  return (
    <footer className={style.footer}>
      <Container className={style.links}>
        © Copyright 2023.
        <Link
          to={TERMS_AND_CONDITIONS}
          onClick={event => onClickHandler(event, TERMS_AND_CONDITIONS)}
          className={cn({
            [style.is_disabled]: locationPathName === TERMS_AND_CONDITIONS,
          })}
        >
          {' '}
          Terms & Conditions{' '}
        </Link>
        and
        <Link
          to={PRIVACY_POLICY}
          onClick={event => onClickHandler(event, PRIVACY_POLICY)}
          className={cn({
            [style.is_disabled]: locationPathName === PRIVACY_POLICY,
          })}
        >
          {' '}
          Privacy Policy
        </Link>
      </Container>
    </footer>
  );
};
