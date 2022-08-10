import React, { useState } from 'react';
import photo from '../../../assets/img/icons/ic_baseline-photo-camera.png'
import './Search.module.css'
import style from './Search.module.css';

const Search = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // передаём action в Dispatch (выполняем запрос на сервер)
  };

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
        type='text'
        className={style.search__text}
        value={text}
        placeholder='Search'
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' hidden />
      <img className={style.search_photo} src={photo} alt="img" />
    </form>
  )
}

export default Search