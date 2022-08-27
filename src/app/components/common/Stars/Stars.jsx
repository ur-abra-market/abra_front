import React from 'react'
import './Stars.css'

const Stars = ({reward}) => {
  const value = `${100 * (reward - Math.floor(reward))}%`;
   
  let percent = ['100%', '100%', '100%', '100%', '100%'];  
  switch (Math.ceil(reward)) {
    case 0:      
      percent = ['0%', '0%', '0%', '0%', '0%'];      
      break;
    case 1:
      if (reward < 1) percent = [value, '0%', '0%', '0%', '0%'];
      if (reward === 1) percent = ['100%', '0%', '0%', '0%', '0%'];
      break;
    case 2:
      if (reward < 2) percent = ['100%', value, '0%', '0%', '0%'];
      if (reward === 2) percent = ['100%', '100%', '0%', '0%', '0%'];
      break;
    case 3:
      if (reward < 3) percent = ['100%', '100%', value,  '0%', '0%'];
      if (reward === 3) percent = ['100%', '100%', '100%',  '0%', '0%'];
      break;
    case 4:
      if (reward < 4) percent = ['100%', '100%', '100%', value, '0%'];
      if (reward === 4) percent = ['100%', '100%', '100%', '100%', '0%'];
      break;
    case 5:
      if (reward < 5) percent = ['100%', '100%', '100%', '100%', value];
      if (reward === 5) percent = ['100%', '100%', '100%', '100%', '100%'];     
      break;
    default:
      alert( "Нет таких значений" );
  }

  return (
    <div className='Stars'>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="url('#StarGradient0')"/>
        <linearGradient id="StarGradient0">
          <stop stopColor="#000000" />
          <stop offset={percent[0]} stopColor="#000000" />
          <stop offset={percent[0]} stopColor="#B6B6B6" />
          <stop offset="100%" stopColor="#B6B6B6" />
        </linearGradient>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="url('#StarGradient1')"/>
        <linearGradient id="StarGradient1">
          <stop stopColor="#000000" />
          <stop offset={percent[1]} stopColor="#000000" />
          <stop offset={percent[1]} stopColor="#B6B6B6" />
          <stop offset="100%" stopColor="#B6B6B6" />
        </linearGradient>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="url('#StarGradient2')"/>
        <linearGradient id="StarGradient2">
          <stop stopColor="#000000" />
          <stop offset={percent[2]} stopColor="#000000" />
          <stop offset={percent[2]} stopColor="#B6B6B6" />
          <stop offset="100%" stopColor="#B6B6B6" />
        </linearGradient>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="url('#StarGradient3')"/>
        <linearGradient id="StarGradient3">
          <stop stopColor="#000000" />
          <stop offset={percent[3]} stopColor="#000000" />
          <stop offset={percent[3]} stopColor="#B6B6B6" />
          <stop offset="100%" stopColor="#B6B6B6" />
        </linearGradient>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="url('#StarGradient4')"/>
        <linearGradient id="StarGradient4">
          <stop stopColor="#000000" />
          <stop offset={percent[4]} stopColor="#000000" />
          <stop offset={percent[4]} stopColor="#B6B6B6" />
          <stop offset="100%" stopColor="#B6B6B6" />
        </linearGradient>
      </svg>
    </div>
  )
}

export default Stars