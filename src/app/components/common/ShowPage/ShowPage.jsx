import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { amount } from '../../../store/reducers/paginateSlice';
import { productPaginateService } from '../../../store/reducers/productPaginateSlice';
import arrowDown from '../../../assets/img/icons/arrow-slide-up.svg'
import './ShowPage.css';

const ShowPage = () => {  
  const dispatch = useDispatch(); 

  const activePage = useSelector((state) => state.paginate.page_num);     
  const filter = useSelector((state) => state.filter);
    
  const list = ['20', '40', '60', '80', '100']
  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px'
  }
    
  const switchList = (e) => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;
    if (!nameClass.includes('ShowPage')) {
      setTimeout(() => {setListSwitch(false)}, 100)      
    }; 
  }
   
  const handlerPage = (el) => {
    setOption(el);
    setListSwitch(!listSwitch);
    dispatch(amount(+el));
    const data = {page_num: activePage, page_size: +el, ...filter}   
    dispatch(productPaginateService(data));
  }

  return (
    <div className='ShowPage' onMouseOut={(e) => switchList(e)}>   
      <div className='ShowPage__select'>
        <div className='ShowPage_text'>{`Show by ${option}`}</div>
        <div className='ShowPage_img' onClick={() => setListSwitch(!listSwitch)}><img src={arrowDown} alt="arrow-down" /></div>
      </div>   
      <ul className='ShowPage__list' style={styleList} >
        {list.map((el, i) => (
          <li className='ShowPage__list_item' key={`option_${el}`} onClick={() => handlerPage(el)}>{el}</li>
        ))}        
      </ul>
    </div>
  )
}

export default ShowPage