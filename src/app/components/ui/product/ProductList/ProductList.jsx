import React from 'react'
import { Link } from "react-router-dom";
import CardFull from '../../../common/CardFull';
import Paginator from '../../../common/Paginator'
import './ProductList.css'

const ProductList = () => {
  const n = 5;
  const dataArr = Array(n).fill("dataCard");

  return (
    <div className='ProductList'>
      <div className='ProductList__control'>
        <div className='ProductList__control_btns'>
          <div className='ProductList__control_blocks' />
          <div className='ProductList__control_list' />
          <div className='ProductList__control_category'>{`< Clothes and Accessories`}y</div>
        </div>
        <Paginator />      
      </div>
      <div className='ProductList__list'>
        {dataArr.map((data, index) => (
          <CardFull key={`${data}-${index}`} />          
        ))}
      </div>
    </div>
  )
}

export default ProductList