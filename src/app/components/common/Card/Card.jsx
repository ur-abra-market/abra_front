import React from 'react';
import { useSelector } from 'react-redux';
import Flag from '../Flag';
import Stars from '../Stars';
import './Card.css'

const Card = () => {
  const price = useSelector((state) => state.product.price);
  return (
    <div className='Card'>
      <div className='Card__image' style={{backgroundImage: 'url("./assets/image/Screenshot_1.png")'}}>        
        <Flag />
      </div>
      <div className='Card__direction'>
        <span>Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dre...</span>
      </div>
      <div className='Card__price'>
        <div className='amount'>${price}/pc</div>
        <span>/from 4 pcs</span>
      </div>
      <Stars/>
    </div>
  )
}

export default Card