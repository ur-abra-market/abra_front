import React from 'react'
import BtnNewBest from '../../common/BtnNewBest/BtnNewBest'
import ProductPath from '../../common/ProductPath'
import ProductPhoto from '../../common/ProductPhoto'
import Reward from '../../common/Reward'
import Slider from '../../common/Slider'
import './ProductPage.css'

const ProductPage = () => {
  const data = ['Similar products', 'Popular products in this category'];
  return (
    <div className='ProductPage'>
      <div className='ProductPage__basic'>
        <div className='ProductPage__basic_left'>
          <ProductPath />
          <ProductPhoto />
        </div>
        <div className='ProductPage__basic_right'>
          <div className='ProductPage__basic_top'>
            <div className='ProductPage__basic_top-btn'>
              <BtnNewBest name='Bestseller' />
              <BtnNewBest name='New Arrivals' />
            </div>             
            <Reward star={true}/>         
          </div>
          <h2>Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall Clothes</h2>
        </div>
      </div>
      <div className='ProductPage__about'>aboute</div>
      <div className='ProductPage__reviews'>reviews</div>
      <Slider title={data[0]} /> 
      <Slider title={data[1]} />           
      <div className='ProductPage__latest'></div>
    </div>
  )
}

export default ProductPage