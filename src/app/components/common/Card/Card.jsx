import React from 'react';
import './Card.css'

const Card = () => {
  return (
    <div className='Card'>
      <div className='Card__image' style={{backgroundImage: 'url("./assets/image/Screenshot_1.png")'}}>        
        <div className='Card__image_flag'>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.1925 13.4081L5.98497 10.1156L1.77747 13.4081C1.23747 13.8356 0.442474 13.4456 0.442474 12.7556V2.35312C0.442474 1.43812 1.18497 0.703125 2.09247 0.703125H9.86997C10.785 0.703125 11.52 1.44562 11.52 2.35312V12.7556C11.5275 13.4456 10.74 13.8356 10.1925 13.4081Z" fill="#D9D9D9"/>
        </svg>
        </div>
      </div>
      <div className='Card__direction'>
        <span>Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dre...</span>
      </div>
      <div className='Card__price'>
        <div className='amount'>$8.50/pc</div>
        <span>/from 4 pcs</span>
      </div>
      <div className='Card__stars'>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="black"/>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="black"/>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="black"/>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="black"/>
      </svg>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z" fill="black"/>
      </svg>
      </div>
    </div>
  )
}

export default Card