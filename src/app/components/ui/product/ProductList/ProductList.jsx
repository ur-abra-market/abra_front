import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import CardFull from '../../../common/CardFull';
import Paginator from '../../../common/Paginator';
import ShowPage from '../../../common/ShowPage';
import './ProductList.css'

const ProductList = () => {
  const amountItems = useSelector((state) => state.paginate.amountItems);  
  const dataArr = Array(+amountItems).fill("dataCard");

  return (
    <div className='ProductList'>
      <div className='ProductList__control'>
        <div className='ProductList__control_btns'>
          <div className='ProductList__control_blocks' />
          <div className='ProductList__control_list' />
          <div className='ProductList__control_category'>{`< Clothes and Accessories`}</div>
        </div>
        <Paginator />      
      </div>
      <div className='ProductList__list'>
        {dataArr.map((data, index) => (
          <CardFull key={`${data}-${index}`} />          
        ))}
      </div>
      <div className='ProductList__control'>
        <ShowPage />
        <Paginator /> 
      </div>
    </div>
  )
}

export default ProductList