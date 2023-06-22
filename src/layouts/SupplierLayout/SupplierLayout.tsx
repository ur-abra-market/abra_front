import { FC } from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../SupplierHeader/SupplierHeader';

import styles from './SupplierLayout.module.css';
import { LayoutProps } from './SupplierLayout.props';

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
