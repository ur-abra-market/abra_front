import React, { useState } from 'react'
import BtnNewBest from '../BtnNewBest'
import ProductQuantityControl from '../ProductQuantityControl'
import Stars from '../Stars'
import './CardFull.css'
import ProductPath from '../../ui/product/ProductPath/ProductPath';
import ProductPrice from '../../ui/product/ProductPrice';
import SupplierCard from '../../ui/product/SupplierCard'
import ImgSlider from '../ImgSlider'

const CardFull = ({props}) => {   
  const [basket, setBasket] = useState(true);
  const style1 = {flexDirection: 'row', alignItems: 'flex-end', gap: '0px'};
  const style2 = {flexDirection: 'column', alignItems: 'flex-start', gap: '8px'};  
  
  return (
    <div className='CardFull'>
      <ImgSlider srcArr={props.images}/>      
      <div className='CardFull__info'>
        <div className='CardFull__block1'>
          <div className='CardFull__direction'>
          <h4>{props.info.name}</h4> 
          <BtnNewBest name='Bestseller' />
          </div>        
          <ProductPath />
        </div>        
        <div className='CardFull__block2'>
          <div className='CardFull__price-stars' style={basket ? style1 : style2}>
            <ProductPrice price={props.info.value_price} quantity={props.info.quantity}/>
            <div className='CardFull__stars-reviews'>
              <Stars reward={+props.info.grade_average}/>
              <span>{`/${props.info.total_reviews} reviews`}</span></div>            
          </div>
          <div className='CardFull__orders'>{`${props.info.total_orders} Orders`}</div>          
        </div>       
        <div className='CardFull__block3'>
          { !basket ? <ProductQuantityControl /> : <div className='CardFull__basket' onClick={() => {setBasket(false); }}><div /></div>}
          <SupplierCard supplier={props.supplier}/>
        </div>        
      </div>                 
    </div>
  )
}

export default CardFull 