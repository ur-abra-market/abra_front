import React from 'react'
import PropTypes from 'prop-types'
import style from './ProductPrice.module.css'

const ProductPrice = ({ price, quantity }) => {
  return (
    <div className={style.productPrice}>
      <div className="amount">${price}/pc</div>
      <span>{`/from ${quantity} pcs`}</span>
    </div>
  )
}
ProductPrice.propTypes = {
  price: PropTypes.string,
  quantity: PropTypes.string
}
export default ProductPrice
