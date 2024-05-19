import { FC, ReactNode } from 'react';

import { useMediaQuery } from 'common/hooks';
import { AdditionalHeaderBlock } from 'elements';
import { Footer } from 'layouts/Footer/Footer';
import { Header, SupplierHeader } from 'layouts/Header';
import { MobileHeader } from 'layouts/Header/MobileHeader/MobileHeader';
import { MobileSupplierHeader } from 'layouts/Header/MobileSupplierHeader/MobileSupplierHeader';

import styles from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
  headerVariant?: 'default' | 'supplier' | 'additional';
}

export const Layout: FC<ILayout> = ({
  children,
  headerVariant = 'default',
}): JSX.Element => {
  const { isDevice } = useMediaQuery();
  const additional = headerVariant === 'additional';

  return (
    <div className={styles.wrapper}>
      {headerVariant === 'default' &&
        (isDevice ? (
          <MobileHeader className={styles.header} />
        ) : (
          <Header className={styles.header} />
        ))}
      {additional && <AdditionalHeaderBlock />}
      {headerVariant === 'supplier' &&
        (isDevice ? (
          <MobileSupplierHeader className={styles.header} />
        ) : (
          <SupplierHeader className={styles.header} />
        ))}

      <main
        className={`${styles.body} ${additional ? styles.additional : ''}`}
        role="main"
      >
        {children}
      </main>

      <Footer variant="black" className={styles.footer} />
    </div>
  );
};
