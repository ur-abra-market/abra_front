import {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { HOME, PRODUCTS_LIST } from 'routes';
import { setSearchValue } from 'store/reducers/searchSlice';

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
  const { pathname } = useLocation();

  const value = useAppSelector(state => state.search.value);
  const role = useAppSelector(state => state.auth.userRole);
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchValue(e.target.value));
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter' && value.length !== 0) {
      if (role === 'seller' || !role) {
        navigate(`${PRODUCTS_LIST}/${value}`);
      }
    }
  };

  useEffect(() => {
    if (pathname === HOME) {
      dispatch(setSearchValue(''));
    }
  }, [pathname]);

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
