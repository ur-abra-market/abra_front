import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNum } from '../../../../store/reducers/productPaginateSlice';
import './PaginatorProduct.css';

const PaginatorProduct = () => {
  const dispatch = useDispatch();
   
  const activePage = useSelector((state) => state.productPaginate.pageNum);
  const amountPages = useSelector((state) => state.productPaginate.amountPages);  
      
  const arrPages = amountPages > 2 ? Array(amountPages - 2).fill(2) : Array(1).fill(1);    
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];
  
  const buttons = pages.map((p) => {
    let currentClass = '';
    if (activePage === p) currentClass = 'activePage';
    if (Math.abs(activePage - p) > 2) currentClass = 'invisible';
    return (
      <div className={`cursor ${currentClass}`} key={p} onClick={() => handlePage(p)}>
        {p}
      </div>
    );
  });
  
  const handlePage = (page) => {    
    dispatch(activeNum(page)); 
  };

  return (
    <div className='PaginatorProduct'>
      <div
        className='PaginatorProduct__left'
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <div className='PaginatorProduct__left_arrow' />
      </div>
      <div className='PaginatorProduct__numbers'>
        <div className={`cursor ${activePage === 1 ? 'activePage' : ''}`} onClick={() => handlePage(1)}>
          1
        </div>   
        <div className={amountPages < 5 || activePage < 5 ? 'invisible' : ''}>...</div>
        {buttons}
        <div className={amountPages < 5 || amountPages - activePage < 4 ? 'invisible' : ''}>...</div>
        
        {amountPages > 1 ? 
          <div
            className={`cursor ${activePage === amountPages ? 'activePage' : ''}`}
            onClick={() => handlePage(amountPages)}
          >
            {amountPages}
          </div> : 
          <></>
        } 
      </div>
      <div
        className='PaginatorProduct__right'
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <div className='PaginatorProduct__right_arrow' />
      </div>      
    </div>
  );
};
 export default PaginatorProduct