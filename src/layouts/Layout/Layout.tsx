import { FC } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';

export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <main className={styles.body} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};
