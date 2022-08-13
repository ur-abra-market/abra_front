import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { amount } from '../../../store/reducers/paginateSlice';
import arrowDown from '../../../assets/img/icons/arrow-slide-up.svg'
import './ShowPage.module.css';

const ShowPage = () => {  
  const dispatch = useDispatch(); 
  dispatch(amount(20));  
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

  return (
    <div className='ShowPage' onMouseOut={(e) => switchList(e)}>   
      <div className='ShowPage__select'>
        <div className='ShowPage_text'>{`Show by ${option}`}</div>
        <div className='ShowPage_img' onClick={() => setListSwitch(!listSwitch)}><img src={arrowDown} alt="arrow-down" /></div>
      </div>   
      <ul className='ShowPage__list' style={styleList} >
        {list.map((e, i) => (
          <li className='ShowPage__list_item' key={`option_${e}`} onClick={() => {setOption(e); setListSwitch(!listSwitch); dispatch(amount(+e))}}>{e}</li>
        ))}        
      </ul>
    </div>
  )
}

export default ShowPage;
