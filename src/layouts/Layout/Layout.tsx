import { FC, ReactNode } from 'react';

import styles from './Layout.module.scss';

import { SupplierHeader, Header } from '.';

import { Footer } from 'layouts/Footer/Footer';

interface ILayout {
  children: ReactNode;
  headerVariant?: 'default' | 'supplier';
}

export const Layout: FC<ILayout> = ({
  children,
  headerVariant = 'default',
}): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {headerVariant === 'default' && <Header className={styles.header} />}
      {headerVariant === 'supplier' && <SupplierHeader className={styles.header} />}

      <main className={styles.body} role="main">
        {children}
      </main>

      <Footer variant="default" className={styles.footer} />
    </div>
  );
};
