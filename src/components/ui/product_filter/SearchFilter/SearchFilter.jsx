import React, { useState } from 'react';

import style from './SearchFilter.module.css';

const SearchFilter = () => {
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    // передаём action в Dispatch (выполняем запрос на сервер)
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
