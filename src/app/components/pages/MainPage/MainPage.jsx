import React from 'react';
import './MainPage.css';
import Slider from '../../common/Slider/Slider';
import Sort from '../../common/Sort/Sort';

const MainPage = () => {
  const dataArr = ['All categories', 'Clothes and accessories', 'Household products', 'Cosmetics and self care'];
  return (
    <div className='main-page'>
      <Sort />
      <div className='Main__sliders'>
        {dataArr.map((data, index) => (
          <Slider key={`name-1-${index}`} title={data} />
        ))} 
      </div>           
    </div>
  )
}

export default MainPage