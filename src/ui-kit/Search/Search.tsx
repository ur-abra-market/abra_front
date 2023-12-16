import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import { useSearchHandler } from 'common/hooks';

import styles from './Search.module.scss';

export interface ISearch
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  isPhotoSearch?: boolean;
  mainSearchField?: boolean;
}

export const Search = forwardRef<HTMLInputElement, ISearch>((props, ref): JSX.Element => {
  const {
    className,
    isPhotoSearch = false,
    mainSearchField = false,
    ...restProps
  } = props;

  const { searchValue, handleChangeValue, handleKeyDown } =
    useSearchHandler(mainSearchField);

  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        className={cn(styles.input, className)}
        ref={ref}
        value={searchValue}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
        type="text"
        {...restProps}
      />

      {isPhotoSearch && (
        <label className={styles.button}>
          <input className={styles.photo_search} type="file" />
        </label>
      )}
    </div>
  );
});
