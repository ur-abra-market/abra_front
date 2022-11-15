import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { active } from '../../../store/reducers/productPaginateSlice';
import ImgSlider from '../ImgSlider';
import Stars from '../Stars';
import './Card.css'

const Card = ({props}) => {  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const image = props.images.length ? [props.images[0]] : [];
  return (
    <div className='Card'>
      <ImgSlider srcArr={image}/>
      <div className='Card__direction' onClick={() => {navigate('../product'); dispatch(active({...props, ...{sum: 0}}))}}>
        <span>{props.info.name}</span>
      </div>
      <div className='Card__price'>
        <div className='amount'>${props.info.value_price}/pc</div>
        <span>{`/from ${props.info.quantity} pcs`}</span>
      </div>
      <Stars reward={+props.info.grade_average}/>
    </div>
  )
}

export default Card