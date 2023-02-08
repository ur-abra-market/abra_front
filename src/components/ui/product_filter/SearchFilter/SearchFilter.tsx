import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { brand, material } from '../../../../store/reducers/filterSlice';

import style from './SearchFilter.module.css';

interface SearchFilterProps {
  typeSearch: any;
}
const SearchFilter: FC<SearchFilterProps> = props => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const brands = useAppSelector(state => state.filter.brands);
  const materials = useAppSelector(state => state.filter.materials);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim() !== '') {
      if (props.typeSearch === 'material') dispatch(material([...materials, text]));
      if (props.typeSearch === 'brand') dispatch(brand([...brands, text]));
    }
  };

  return (
    <form className={style.searchFilter} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.searchFilter__text}
        value={text}
        placeholder="Search"
        onChange={e => setText(e.target.value)}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default SearchFilter;
