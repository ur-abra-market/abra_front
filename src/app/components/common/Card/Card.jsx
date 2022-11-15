import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actve } from '../../../store/reducers/productPaginateSlice'
import ImgSlider from '../ImgSlider'
import Stars from '../Stars'
import style from './Card.module.css'

const Card = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // TODO: replace this object using URI-parameters
  const param = {
    product_id: product.id,
    info: {
      name: product.name,
      grade_average: product.grade_average,
      value_price: product.price_include_discount,
      min_quantity: product.min_quantity,
      with_discount: product.with_discount,
      datetime: product.date_added,
      total_reviews: 3,
      total_orders: product.total_orders
    },
    images: [
      {
        image_url: '$URL',
        serial_number: 0
      }
    ],
    supplier: null
  }

  const productClickHandler = () => {
    navigate('../product')
    dispatch(actve({ ...param, ...{ sum: 0 } }))
  }

  return (
    <div className={style.ard}>
      <ImgSlider srcArr={[product.image_url]} />
      <div className={style.card__direction} onClick={productClickHandler}>
        <span>{product.name}</span>
      </div>
      <div className={style.card__price}>
        <div className={style.amount}>${product.price_include_discount}/pc</div>
        <span>{`/from ${product.min_quantity} pcs`}</span>
      </div>
      <Stars reward={+product.grade_average} />
    </div>
  )
}
Card.propTypes = {
  product: PropTypes.object
}

export default Card
