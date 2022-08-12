import React from 'react'
import './SellerCard.css'

const SellerCard = () => {
  return (
    <div className='SellerCard'>
      <div className='SellerCard__avatar' />
      <div className='SellerCard__info'>
        <div className='SellerCard__info_name'>Ningbo Beilun Lonsyne</div>
        <div className='SellerCard__info_deals'>4 Years : 124 Deals : On-time delivery 98.4%</div>
      </div>
      <div className='SellerCard__arrow' />
    </div>
  )
}

export default SellerCard