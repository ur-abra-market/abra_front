import { FC, ReactNode } from 'react';

import styles from './SupplierLayout.module.scss';

import { Footer } from 'layouts/Footer/Footer';
import { SupplierHeader } from 'layouts/Layout';

export interface LayoutProps {
  children: ReactNode;
}

export const SupplierLayout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <SupplierHeader className={styles.header} />
      <main className={styles.body} role="main">
        {children}
      </main>
      <Footer variant="default" className={styles.footer} />
    </div>
  );
};
