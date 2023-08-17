import { FC } from 'react';

import { useDispatch } from 'react-redux';

import styles from './Pagination.module.scss';

import { ArrowIcon } from 'assets/icons'; // 24px

interface PaginationProps {
  activePage: number;
  amountPages: number;
}

const Pagination: FC<PaginationProps> = ({ activePage, amountPages }) => {
  const dispatch = useDispatch();

  const arrPages = Array(amountPages - 2).fill(2);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];

  const buttons = pages.map(p => {
    let currentClass = '';

    if (activePage === p) currentClass = `${styles.activePage}`;
    if (Math.abs(activePage - p) > 2) currentClass = `${styles.invisible}`;

    return (
      <div
        className={`${styles.cursor} ${currentClass}`}
        key={p}
        role="presentation"
        onClick={() => handlePage(p)}
      >
        {p}
      </div>
    );
  });

  const handlePage = (page: number): void => {
    // dispatch(active(page));
  };

  return (
    <div className={styles.paginator_product}>
      <div
        role="presentation"
        className={styles.paginator_product_left}
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <ArrowIcon className={styles.paginator_product_left_arrow} />
      </div>
      <div className={styles.paginator_product_numbers}>
        <div
          className={activePage === 1 ? `${styles.active_page}` : `${styles.cursor}`}
          role="presentation"
          onClick={() => handlePage(1)}
        >
          1
        </div>

        <div className={amountPages < 5 || activePage < 5 ? `${styles.invisible}` : ''}>
          ...
        </div>
        {buttons}
        <div
          className={
            amountPages < 5 || amountPages - activePage < 4 ? `${styles.invisible}` : ''
          }
        >
          ...
        </div>

        <div
          className={
            activePage === amountPages ? `${styles.active_page}` : `${styles.cursor}`
          }
          role="presentation"
          onClick={() => handlePage(amountPages)}
        >
          {amountPages}
        </div>
      </div>
      <div
        role="presentation"
        className={styles.paginator_product_right}
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <ArrowIcon className={styles.paginator_product_right_arrow} />
      </div>
    </div>
  );
};

export default Pagination;
