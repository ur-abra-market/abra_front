import {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';

import cn from 'classnames';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { PRODUCTS_LIST } from 'routes';

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

  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [searchValue, setSearchValue] = useState(mainSearchField ? query || '' : '');

  const role = useAppSelector(state => state.auth.userRole);
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isSearchFieldValid = mainSearchField && searchValue;
    const isEnterKey = event.code === 'Enter';
    const isSearchValueValid = searchValue.trim().length !== 0;
    const isSellerRole = role === 'seller' || !role;

    if (isSearchFieldValid) {
      const path = `${PRODUCTS_LIST}/${id || ''}?${createSearchParams({
        query: searchValue,
      }).toString()}`;

      if (isEnterKey && isSearchValueValid && isSellerRole) {
        navigate(path);
      }
    }
  };

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
