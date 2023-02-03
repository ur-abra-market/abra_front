import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { active } from '../../../store/reducers/productPaginateSlice'
import ImgSlider from '../ImgSlider'
import Stars from '../Stars'
import style from './Card.module.css'
import PropTypes from 'prop-types'

const Card = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const image = props.images.length ? [props.images[0]] : []
  return (
    <div className='Card'>
      <ImgSlider srcArr={image} />
      <div className='Card__direction' onClick={() => { navigate('../product'); dispatch(active({ ...props, ...{ sum: 0 } })) }}>
        <span>{props.info.name}</span>
      </div>
      <div className={style.card__price}>
        <div className={style.amount}>${props.product.price_include_discount}/pc</div>
        <span>{`/from ${props.product.min_quantity} pcs`}</span>
      </div>
      <Stars reward={+props.product?.grade_average} />
    </div>
  )
}

Card.propTypes = {
    images: PropTypes.any,
    info: PropTypes.any,
    product: PropTypes.any
}

export default Card
