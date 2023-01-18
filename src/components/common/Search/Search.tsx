import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import photo from '../../../assets/img/icons/ic_baseline-photo-camera.png'

const Search = ({ placeholder, searchIcon, classes, onClick }) => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    navigate('../products-list');
    // передаём action в Dispatch (выполняем запрос на сервер)
  };

  return (
    <form className={classes.search__wrap} onSubmit={handleSubmit}>
      <input
        type="text"
        className={classes.search__input}
        value={text}
        placeholder={placeholder}
        onChange={e => setText(e.target.value)}
      />
      <input type="submit" hidden />
      <img
        className={classes.search_photo}
        src={searchIcon}
        onClick={onClick}
        alt="img"
      />
    </form>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  searchIcon: PropTypes.string,
  classes: PropTypes.object,
  onClick: PropTypes.func,
};
export default Search;
