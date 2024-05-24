import { ChangeEvent, KeyboardEvent, MouseEventHandler, useEffect } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from './useAppDispatch';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { FAVORITES, PRODUCTS, PRODUCTS_LIST } from 'routes';
import { setMainSearchValue, setSearchValue } from 'store/reducers/searchSlice';

interface ISearchHandlerReturnType {
  value: string;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveValue: MouseEventHandler<HTMLButtonElement>;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
export const useSearchHandler = (
  mainSearchField: boolean = false,
): ISearchHandlerReturnType => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const role = useAppSelector(state => state.auth.userRole);
  const mainSearchValue = useAppSelector(state => state.search.searchValues.mainSearch);
  const searchValue = useAppSelector(state => state.search.searchValues.search);
  const value = mainSearchField ? mainSearchValue : searchValue;
  const setValue = mainSearchField ? setMainSearchValue : setSearchValue;

  useEffect(() => {
    dispatch(setValue(mainSearchField ? query || '' : ''));
  }, []);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setValue(e.target.value));
  };

  const handleRemoveValue = (): void => {
    dispatch(setValue(''));
  };

  const roleURL = (role: string | null): string => {
    switch (role) {
      case 'seller':
        return `${mainSearchField ? `${PRODUCTS_LIST}/` : FAVORITES}${id || ''}`;
      case 'supplier':
        return `${mainSearchField ? `${PRODUCTS}/` : FAVORITES}`;
      default:
        return '';
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isEnterKey = event.code === 'Enter';
    const isSearchValue = value.trim().length !== 0;

    if (isSearchValue) {
      const path = `${roleURL(role)}?query=${value}`;

      if (isEnterKey) {
        navigate(path);
      }
    }
  };

  return { value, handleChangeValue, handleRemoveValue, handleKeyDown };
};
