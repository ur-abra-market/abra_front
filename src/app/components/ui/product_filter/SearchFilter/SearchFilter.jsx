import React, { useState } from 'react';
import './SearchFilter.css'

const SearchFilter = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // передаём action в Dispatch (выполняем запрос на сервер)
  };

  return (
    <form className='SearchFilter' onSubmit={handleSubmit}>
      <input
        type='text'
        className='SearchFilter__text'
        value={text}
        placeholder='Search'
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' hidden />      
    </form>
  )
}

export default SearchFilter