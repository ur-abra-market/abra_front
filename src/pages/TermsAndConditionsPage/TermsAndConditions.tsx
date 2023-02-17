import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import home from '../../assets/img/icons/build.png';
import { Container } from '../../components';
import { Logo } from '../../components/new-components/Logo/Logo';

import styles from './TermsAndConditions.module.css';

export const TermsAndConditions: FC = () => {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Container className={styles.container}>
          <Logo />
          <Link to="/" className={styles.link}>
            <img className={styles.icon} alt="link to home" src={home} />
          </Link>
        </Container>
      </header>
      <Container>
        <div className={styles.inner}>
          <h1>Terms & conditions</h1>
          <div>CONTENT</div>
        </div>
      </Container>

      <footer className={styles.footer}>
        <Container className={styles.links}>
          © Copyright 2022.
          <Link to="/"> Terms & Conditions </Link>
          and
          <Link to="/"> Privacy Policy</Link>
        </Container>
      </footer>
    </section>
  );
};
