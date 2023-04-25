import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from '../new-components/Container/Container';

import style from './FooterForAuth.module.css';

export const FooterForAuth = (): JSX.Element => {
  return (
    <footer className={style.footer}>
      <Container className={style.links}>
        © Copyright 2023.
        <Link to="/terms&conditions"> Terms & Conditions </Link>
        and
        <Link to="/privacy&policy"> Privacy Policy</Link>
      </Container>
    </footer>
  );
};
