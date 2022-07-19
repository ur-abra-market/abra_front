import React from 'react';
import Card from '../Card/Card';
import './Slider.css';

const Slider = ({title}) => {
  const dataArr = Array(9).fill('dataCard');
  return (
    <div className='Slider'>
      <h2>{title}</h2>
      <div className='Slider__card'>
        <div className='Slider__card_list'>
          {dataArr.map((data, index) => (
            <Card key={`${data}-${index}`}/>
          ))}                  
        </div>
      </div>
    </div>
  )
}

export default Slider