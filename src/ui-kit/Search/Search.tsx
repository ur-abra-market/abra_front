import {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
} from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { PRODUCTS_LIST } from 'routes';
import { setValue } from 'store/reducers/searchSlice';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const value = useAppSelector(state => state.search.value);
  const role = useAppSelector(state => state.auth.userRole);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setValue(e.target.value));
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter' && value.length !== 0) {
      if (role === 'seller' || !role) {
        navigate(`${PRODUCTS_LIST}/${value}`);
      }
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        className={cn(styles.input, className)}
        ref={ref}
        value={value}
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
