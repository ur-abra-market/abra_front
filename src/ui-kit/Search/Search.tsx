import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Search.module.scss';

export interface ISearch
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  isPhotoSearch?: boolean;
}

export const Search = forwardRef<HTMLInputElement, ISearch>((props, ref): JSX.Element => {
  const { className, isPhotoSearch = false, ...restProps } = props;

  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        className={cn(styles.input, className)}
        ref={ref}
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
