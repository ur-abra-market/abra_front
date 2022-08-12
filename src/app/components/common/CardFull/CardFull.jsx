import React, { useState } from 'react'
import BtnNewBest from '../BtnNewBest'
import ProductQuantityControl from '../ProductQuantityControl'
import Stars from '../Stars'
import './CardFull.css'
import ProductPath from '../../ui/product/ProductPath/ProductPath';
import ProductPrice from '../../ui/product/ProductPrice';
import SellerCard from '../../ui/product/SellerCard'

const CardFull = () => {  
  const [basket, setBasket] = useState(true);
  const style1 = {flexDirection: 'row', alignItems: 'flex-end', gap: '0px'};
  const style2 = {flexDirection: 'column', alignItems: 'flex-start', gap: '8px'};

  return (
    <div className='CardFull'>
      <div className='CardFull__image' style={{backgroundImage: 'url("./assets/image/Screenshot_1.png")'}}>
        <div className='CardFull__image_flag'>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1925 13.4081L5.98497 10.1156L1.77747 13.4081C1.23747 13.8356 0.442474 13.4456 0.442474 12.7556V2.35312C0.442474 1.43812 1.18497 0.703125 2.09247 0.703125H9.86997C10.785 0.703125 11.52 1.44562 11.52 2.35312V12.7556C11.5275 13.4456 10.74 13.8356 10.1925 13.4081Z" fill="#D9D9D9"/>
          </svg>
        </div>
      </div>       
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