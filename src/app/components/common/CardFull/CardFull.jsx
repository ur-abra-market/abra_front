import React, { useState } from 'react'
import BtnNewBest from '../BtnNewBest'
import ProductQuantityControl from '../ProductQuantityControl'
import Stars from '../Stars'
import './CardFull.css'
import ProductPath from '../../ui/product/ProductPath/ProductPath';
import ProductPrice from '../../ui/product/ProductPrice';
import SellerCard from '../../ui/product/SellerCard'
import ImgSlider from '../ImgSlider'

const CardFull = () => {  
  const [basket, setBasket] = useState(true);
  const style1 = {flexDirection: 'row', alignItems: 'flex-end', gap: '0px'};
  const style2 = {flexDirection: 'column', alignItems: 'flex-start', gap: '8px'};  
  
  return (
    <div className='CardFull'>
      <ImgSlider />      
      <div className='CardFull__info'>
        <div className='CardFull__block1'>
          <div className='CardFull__direction'>
          <h4>Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall Clothes</h4> 
          <BtnNewBest name='Bestseller' />
          </div>        
          <ProductPath />
        </div>        
        <div className='CardFull__block2'>
          <div className='CardFull__price-stars' style={basket ? style1 : style2}>
            <ProductPrice />
            <div className='CardFull__stars-reviews'>
              <Stars />
              <span>/9 859 reviews</span></div>            
          </div>
          <div className='CardFull__orders'>1 995 874 Orders</div>          
        </div>       
        <div className='CardFull__block3'>
          { !basket ? <ProductQuantityControl /> : <div className='CardFull__basket' onClick={() => {setBasket(false); }}><div /></div>}
          <SellerCard />
        </div>        
      </div>                 
    </div>
  )
}

export default CardFull 