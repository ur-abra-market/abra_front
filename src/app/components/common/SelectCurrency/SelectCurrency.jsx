import React, { useState } from 'react'
import arrowDown from '../../../assets/img/icons/arrow-down.png'
import './SelectCurrency.css'

const SelectCurrency = () => {
  const [option, setOption] = useState('English / USD');
  const [list, setList] = useState(false);
  const styleList = {
    height: list ? 'fit-content' : '0px'
  }
  return (
    <div className='header__currency'>   
      <div className='currency-select' onClick={() =>setList(!list)}>
        <div className='select-text'>{option}</div>
        <div className='select-img'><img src={arrowDown} alt="arrow-down" /></div>
      </div>   
      <ul className='currency-list-options' style={styleList}>
        <li className='currency-option' onClick={() => {setOption('English / USD'); setList(!list)}}>English / USD</li>
        <li className='currency-option' onClick={() => {setOption('Russian / RUB'); setList(!list)}}>Russian / RUB</li>
      </ul>
    </div>
  )
}


export default SelectCurrency