import React from 'react'
import './CheckItems.css'

const CheckItems = ({index}) => {
  return (
    <div className='CheckItems'>
      {+index ? <></> : <h4>Items to Order</h4>}      
      <div className='CheckItems__block'>
        <div className='CheckItems__block_seller'>Ningbo Beilun Lonsyne</div>
        <div className='CheckItems__block_note'>+ Add a note</div>
      </div>    
      <div className='CheckItems__product'>
        <div className='CheckItems__product_photo'></div>
        <div className='CheckItems__product_info'>
          <div className='CheckItems__product_info-name'>Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall Clothes</div>
          <div className='CheckItems__product_info-property'>
            <span>Color: Silver</span>
            <span>Quantity: 100</span>
          </div>
          <div className='CheckItems__product_info-price'>$780</div>
          <div className='CheckItems__product_info-offer'>Special offer: ≥ 100 = 1pc/$7.80</div>
        </div>
      </div> 
      <div className='CheckItems__delivery'>
        <div className='CheckItems__delivery_info'>Processing time: 14 day</div>
        <div className='CheckItems__delivery_point' />
        <div className='CheckItems__delivery_info'>Estimated delivery: 27.07.2022</div>
        <div className='CheckItems__delivery_point' />
        <div className='CheckItems__delivery_info'>Delivery method: Abra Shipment</div>
      </div> 
    </div>
  )
}

export default CheckItems