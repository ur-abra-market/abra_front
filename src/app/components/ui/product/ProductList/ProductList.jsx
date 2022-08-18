import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CardFull from '../../../common/CardFull';
import Card from '../../../common/Card';
import Paginator from '../../../common/Paginator';
import ShowPage from '../../../common/ShowPage';
import './ProductList.css'
import InfoBtn from '../../../common/InfoBtn';

const ProductList = () => {
  const amountItems = useSelector((state) => state.paginate.amountItems);  
  const dataArr = Array(+amountItems).fill("dataCard");
  const [list, setList] = useState(true);

  return (
    <div className='ProductList'>
      <div className='ProductList__control'>
        <div className='ProductList__control_btns'>
          <div className='ProductList__control_blocks' onClick={() => setList(false)} />
          <div className='ProductList__control_list' onClick={() => setList(true)} />
          <div className='ProductList__control_category'>{`< Clothes and Accessories`}</div>
        </div>
        <Paginator />      
      </div>
      <div className='ProductList__list'>
        {dataArr.map((data, index) => list ? (
          <CardFull key={`${data}-${index}`} />          
        ): (<Card key={`${data}-${index}`} />))}
      </div>
      <div className='ProductList__control'>
        <ShowPage />
        <Paginator /> 
      </div>
      <div className='ProductList__InfoBtn'>
        <InfoBtn />
      </div>      
    </div>
  )
}

export default ProductList