import { FC, useState } from 'react';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { brand, material } from 'store/reducers/filterSlice';

import style from './SearchFilter.module.css';

interface SearchFilterProps {
  typeSearch: any;
}
const SearchFilter: FC<SearchFilterProps> = ({ typeSearch }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const brands = useAppSelector(state => state.filter.brands);
  const materials = useAppSelector(state => state.filter.materials);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (text.trim() !== '') {
      if (typeSearch === 'material') dispatch(material([...materials, text]));
      if (typeSearch === 'brand') dispatch(brand([...brands, text]));
    }
  };

  return (
    <form className={style.search_filter} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.search_filter_text}
        value={text}
        placeholder="Search"
        onChange={e => setText(e.target.value)}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default SearchFilter;
