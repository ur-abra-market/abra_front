import React, { useState } from 'react';
import arrowDown from '../../../../assets/img/icons/arrow-down.png'
import './SelectFilter.css';

const SelectFilter = ({list}) => {  
  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px'
  }
  const basic = option.split(/[()]/)[0];
  const remains = option.split(/[()]/)[1];
  
  
  const switchList = (e) => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;
    if (!nameClass.includes('SelectFilter')) {
      setTimeout(() => {setListSwitch(false)}, 100)      
    }; 
  }
  
  return (
    <div className='SelectFilter' onMouseOut={(e) => switchList(e)}>   
      <div className='SelectFilter__select' onClick={() => setListSwitch(!listSwitch)}>
        <div className='SelectFilter_text'>
          <div>{basic}</div>
          <div className='SelectFilter_text-remains'>{remains ? `(${remains})`: ''}</div>          
        </div>
        <div className='SelectFilter_img'><img src={arrowDown} alt="arrow-down" /></div>
      </div>   
      <ul className='SelectFilter__list' style={styleList} >
        {list.map((e, i) => (
          <li className='SelectFilter__list_item' key={`option_${e}`} onClick={() => {setOption(e); setListSwitch(!listSwitch)}}>{e}</li>
        ))}        
      </ul>
    </div>
  )
}

export default SelectFilter