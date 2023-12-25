import { ChangeEvent, useState, KeyboardEvent } from 'react';

import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { PRODUCTS_LIST } from 'routes';

interface ISearchHandlerReturnType {
  searchValue: string;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
export const useSearchHandler = (
  mainSearchField: boolean = false,
): ISearchHandlerReturnType => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const role = useAppSelector(state => state.auth.userRole);

  const [searchValue, setSearchValue] = useState(mainSearchField ? query || '' : '');

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isSearchFieldValid = mainSearchField && searchValue;
    const isEnterKey = event.code === 'Enter';
    const isSearchValueValid = searchValue.trim().length !== 0;
    const isRole = role === 'seller' || !role;

    if (isSearchFieldValid) {
      const path = `${PRODUCTS_LIST}/${id || ''}?${createSearchParams({
        query: searchValue,
      }).toString()}`;

      if (isEnterKey && isSearchValueValid && isRole) {
        navigate(path);
      }
    }
  };

  return { searchValue, handleChangeValue, handleKeyDown };
};
