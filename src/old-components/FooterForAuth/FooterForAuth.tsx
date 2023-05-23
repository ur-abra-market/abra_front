import React, { MouseEvent } from 'react';

import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

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

  const TERMS_CONDITIONS = '/terms&conditions' as const;
  const PRIVACY_POLICY = '/privacy&policy' as const;

  return (
    <footer className={style.footer}>
      <Container className={style.links}>
        © Copyright 2023.
        <Link
          to={TERMS_CONDITIONS}
          onClick={event => onClickHandler(event, TERMS_CONDITIONS)}
          className={cn({
            [style.is_disabled]: locationPathName === TERMS_CONDITIONS,
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
