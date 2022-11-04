import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actve } from '../../../store/reducers/productPaginateSlice';
import ImgSlider from '../ImgSlider';
import Stars from '../Stars';
import './Card.css'

const Card = ({product}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const image = props.images.length ? [props.images[0]] : props.images;


  return (
    <div className='Card'>
      <ImgSlider srcArr={[product.image_url]}/>
      <div className='Card__direction' onClick={() => navigate('../product')}>
        <span>{product.name}</span>
      </div>
      <div className='Card__price'>
        <div className='amount'>${product.price_include_discount}/pc</div>
        <span>{`/from ${product.min_quantity} pcs`}</span>
      </div>
      <Stars reward={+product.grade_average}/>
    </div>

    // <div className='Card'>
    //   <ImgSlider srcArr={image}/>
    //   <div className='Card__direction' onClick={() => {navigate('../product'); dispatch(actve({...props, ...{sum: 0}}))}}>
    //     <span>{props.info.name}</span>
    //   </div>
    //   <div className='Card__price'>
    //     <div className='amount'>${props.info.value_price}/pc</div>
    //     <span>{`/from ${props.info.quantity} pcs`}</span>
    //   </div>
    //   <Stars reward={+props.info.grade_average}/>
    // </div>
  )
}

export default Card
