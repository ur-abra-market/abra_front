import React, { useState } from 'react';
import arrowDown from '../../../assets/img/icons/arrow-down.png'
import './SelectShip.css';

const SelectShip = () => {
  const [option, setOption] = useState('Ship to');
  const [list, setList] = useState(false);
  const styleList = {
    height: list ? 'fit-content' : '0px'
  }
  return (
    <div className='header__ship'>   
      <div className='ship-select' onClick={() =>setList(!list)}>
        <div className='select-text'>{option}</div>
        <div className='select-img'><img src={arrowDown} alt="arrow-down" /></div>
      </div>   
      <ul className='ship-list-options' style={styleList}>
        <li className='ship-option' onClick={() => {setOption('Ship to'); setList(!list)}}>Ship to</li>
        <li className='ship-option' onClick={() => {setOption('Ship from'); setList(!list)}}>Ship from</li>
      </ul>
    </div>
  )
}

export default SelectShip