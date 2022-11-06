import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actve } from '../../../store/reducers/productPaginateSlice'
import ImgSlider from '../ImgSlider'
import Stars from '../Stars'
import style from './Card.module.css'

const Card = ({ props }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const image = props.images.length ? [props.images[0]] : props.images
  console.log(image)
  return (
    <div className={style.card}>
      <ImgSlider srcArr={image} />
      <div
        className={style.card__direction}
        onClick={() => {
          navigate('../product')
          dispatch(actve({ ...props, ...{ sum: 0 } }))
        }}
      >
        <span>{props.info.name}</span>
      </div>
      <div className={style.card__price}>
        <div className={style.amount}>${props.info.value_price}/pc</div>
        <span>{`/from ${props.info.quantity} pcs`}</span>
      </div>
      <Stars reward={+props.info.grade_average} />
    </div>
  )
}
Card.propTypes = {
  props: PropTypes.object,
  images: PropTypes.array,
  info: PropTypes.object
}

export default Card
