import React, { useState } from 'react';
import './Search.module.css'
import style from './Search.module.css';

const Search = ({ placeholder, searchIcon, classes }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // передаём action в Dispatch (выполняем запрос на сервер)
  };

  return (
    <form className={classes.search__wrap} onSubmit={handleSubmit}>
      <input
        type='text'
        className={classes.search__input}
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' hidden />
      <img className={style.search_photo} src={searchIcon} alt="img" />
    </form>
  )
}

export default Search