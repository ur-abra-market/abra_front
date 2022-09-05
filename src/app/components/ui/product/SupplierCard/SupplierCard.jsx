import React from 'react'
import './SupplierCard.css'

const SupplierCard = ({supplier}) => {
  return (
    <div className='SupplierCard'>
      <div className='SupplierCard__avatar' />
      <div className='SupplierCard__info'>
        <div className='SupplierCard__info_name'>{supplier.name}</div>
        <div className='SupplierCard__info_deals'>{`${supplier.period} Years : ${supplier.count} Deals : On-time delivery ${supplier.value}%`}</div>
      </div>
      <div className='SupplierCard__arrow' />
    </div>
  )
}

export default SupplierCard