import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { active } from '../../../store/reducers/productPaginateSlice'
import ImgSlider from '../ImgSlider'
import Stars from '../Stars'
import './Card.css'

const Card = ({ props }) => {
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
