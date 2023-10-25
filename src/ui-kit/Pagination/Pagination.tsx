import { FC, useEffect, useState } from 'react';

import classNames from 'classnames';

import { ArrowIcon } from 'assets/icons';

import style from './Pagination.module.scss';

interface IPagination {
  totalPages: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  disabled?: boolean;
}

export const Pagination: FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChanged,
  disabled = false,
}) => {
  const [visibleButtons, setVisibleButtons] = useState<Array<number | string>>([]);
  const pageNumbers: number[] = [];

  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    let updatedVisibleButtons: Array<number | string> = [...visibleButtons];
    const dotsStr = '...' as string;

    if (pageNumbers.length < 6) {
      updatedVisibleButtons = pageNumbers; // [1, 2, 3, 4, 5]
    } else if (currentPage <= 4) {
      updatedVisibleButtons = [1, 2, 3, 4, 5, dotsStr, pageNumbers.length]; // [1, 2, 3, 4, 5, '...', 20]
    } else if (currentPage >= 4 && currentPage < pageNumbers.length - 3) {
      // from 5 to 17 -> (20 - 3)
      const sliced1 = pageNumbers.slice(currentPage - 2, currentPage); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = pageNumbers.slice(currentPage, currentPage + 1); // sliced1 (5, 5+1) -> [6]

      updatedVisibleButtons = [
        1,
        dotsStr,
        ...sliced1,
        ...sliced2,
        dotsStr,
        pageNumbers.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentPage > pageNumbers.length - 4) {
      // > 16
      const sliced = pageNumbers.slice(pageNumbers.length - 5); // slice(20-5)

      updatedVisibleButtons = [1, dotsStr, ...sliced]; // [1, '...', 16, 17, 18, 19 , 20]
    }

    setVisibleButtons(updatedVisibleButtons);
  }, [currentPage, totalPages]);

  const handlePrevPage = (): void => {
    onPageChanged(currentPage <= 1 ? currentPage : currentPage - 1);
  };
  const handleNextPage = (): void => {
    onPageChanged(currentPage >= pageNumbers.length ? currentPage : currentPage + 1);
  };
  const handleSelectPage = (item: string | number): void => {
    if (typeof item === 'number') {
      onPageChanged(item);
    }
  };

  const modsButtons = {
    [style.disabled]: disabled,
  };
  const modsArrowRight = {
    [style.disabled]: currentPage === pageNumbers.length || disabled,
  };
  const modsArrowLeft = {
    [style.disabled]: currentPage === 1 || disabled,
  };

  return (
    <div className={style.container}>
      <button
        type="button"
        className={classNames(style.button, modsArrowLeft)}
        onClick={handlePrevPage}
        disabled={disabled || firstPage}
      >
        <ArrowIcon className={classNames(style.arrow, style.arrow_left)} />
      </button>

      {visibleButtons.map((item, index) => {
        const modsCurrentButton = {
          [style.is_disabled_dot]: item === '...',
          [style.active]: currentPage === item,
        };

        return (
          <button
            type="button"
            key={index}
            className={classNames(style.button, modsCurrentButton, modsButtons)}
            onClick={() => handleSelectPage(item)}
            disabled={disabled}
            tabIndex={item === '...' ? -1 : 0}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className={classNames(style.button, modsArrowRight)}
        onClick={handleNextPage}
        disabled={disabled || lastPage}
      >
        <ArrowIcon className={classNames(style.arrow, style.arrow_right)} />
      </button>
    </div>
  );
};
