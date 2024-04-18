import { ChangeEvent, KeyboardEvent, useEffect } from 'react';

import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { useAppDispatch } from './useAppDispatch';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { PRODUCTS, PRODUCTS_LIST } from 'routes';
import { setSearchValue } from 'store/reducers/searchSlice';

interface ISearchHandlerReturnType {
  searchValue: string;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
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
  const searchValue = useAppSelector(state => state.search.searchValue);

  useEffect(() => {
    dispatch(setSearchValue(mainSearchField ? query || '' : ''));
  }, []);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchValue(e.target.value));
  };

  const roleURL = (role: string | null): string => {
    switch (role) {
      case 'seller':
        return `${PRODUCTS_LIST}/${id || ''}`;
      case 'supplier':
        return `${PRODUCTS}/`;
      default:
        return '';
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isEnterKey = event.code === 'Enter';
    const isSearchValue = searchValue.trim().length !== 0;

    if (isSearchValue) {
      const path = `${roleURL(role)}?${createSearchParams({
        query: searchValue,
      }).toString()}`;

      if (isEnterKey) {
        navigate(path);
      }
    }
  };

  return { searchValue, handleChangeValue, handleKeyDown };
};
