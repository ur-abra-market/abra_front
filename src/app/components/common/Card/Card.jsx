import React from 'react';
import ImgSlider from '../ImgSlider';
import Stars from '../Stars';
import './Card.css'

const Card = ({props}) => {  
  const image = props.images.length ? [props.images[0]] : props.images;
  return (
    <div className='Card'>
      <ImgSlider srcArr={image}/>
      <div className='Card__direction'>
        <span>{props.info.name}</span>
      </div>
      <div className='Card__price'>
        <div className='amount'>${props.info.value_price}/pc</div>
        <span>{`/from ${props.info.quantity} pcs`}</span>
      </div>
      <Stars reward={+props.info.grade_average}/>
    </div>
  )
}

export default Card