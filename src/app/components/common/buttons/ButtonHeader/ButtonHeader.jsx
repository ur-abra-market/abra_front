import React from 'react';
import './ButtonHeader.css';

const ButtonHeader = (props) => {
  const {name, imgSrc} = props;
  return (
    <div className='button-header'>
      <div className='button-header__image'>
        <img className='button-header__image-img' src={imgSrc} alt="btn-header" />
      </div>
      <div className='button-header__name'>{name}</div>
    </div>
  )
}

export default ButtonHeader