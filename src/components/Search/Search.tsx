import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// import photo from '../../../assets/img/icons/ic_baseline-photo-camera.png'

interface SearchProps {
  placeholder: string;
  searchIcon: string;
  classes: any;
  onClick: any;
}
const Search: FC<SearchProps> = ({
  placeholder,
  searchIcon,
  classes,
  onClick,
}): JSX.Element => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (): void => {
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
        role="presentation"
        className={classes.search_photo}
        src={searchIcon}
        onClick={onClick}
        alt="img"
      />
    </form>
  );
};

export default Search;
