import { FC, ReactNode } from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../SupplierHeader/SupplierHeader';

import styles from './SupplierLayout.module.scss';

export interface LayoutProps {
  children: ReactNode;
}

export const SupplierLayout: FC<LayoutProps> = ({ children }): JSX.Element => {
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
