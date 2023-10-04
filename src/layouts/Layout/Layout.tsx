import { FC, ReactNode, useLayoutEffect, useState } from 'react';

import { Footer } from 'layouts/Footer/Footer';
import { Header, SupplierHeader } from 'layouts/Header';
import { MobileHeader } from 'layouts/Header/MobileHeader/MobileHeader';
import { MobileSupplierHeader } from 'layouts/Header/MobileSupplierHeader/MobileSupplierHeader';

import styles from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
  headerVariant?: 'default' | 'supplier';
}

export const Layout: FC<ILayout> = ({
  children,
  headerVariant = 'default',
}): JSX.Element => {
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChangeMediaQuery = (e: MediaQueryListEvent | MediaQueryList): void => {
      if (e.matches) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    mediaQuery.addEventListener('change', handleChangeMediaQuery);
    handleChangeMediaQuery(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleChangeMediaQuery);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {headerVariant === 'default' &&
        (isMobileView ? (
          <MobileHeader className={styles.header} />
        ) : (
          <Header className={styles.header} />
        ))}

      {headerVariant === 'supplier' &&
        (isMobileView ? (
          <MobileSupplierHeader className={styles.header} />
        ) : (
          <SupplierHeader className={styles.header} />
        ))}

      <main className={styles.body} role="main">
        {children}
      </main>

      <Footer variant="default" className={styles.footer} />
    </div>
  );
};
