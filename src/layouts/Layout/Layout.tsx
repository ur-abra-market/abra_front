import { FC, ReactNode } from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />

      <main className={styles.body} role="main">
        {children}
      </main>

      <Footer variant="default" className={styles.footer} />
    </div>
  );
};
