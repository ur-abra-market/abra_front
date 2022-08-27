import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from '../../../assets/img/icons/ic_baseline-photo-camera.png'
import './Search.css'

const Search = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {    
    navigate('../productList')
    // передаём action в Dispatch (выполняем запрос на сервер)
  };

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input
        type='text'
        className='search__text'
        value={text}
        placeholder='Search'
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' hidden />
      <img className='search-photo' src={photo} alt="img" />
    </form>
  )
}

export default Search