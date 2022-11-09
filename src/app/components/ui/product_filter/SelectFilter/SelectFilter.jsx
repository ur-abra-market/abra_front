import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sort, category, ascending } from '../../../../store/reducers/filterSlice';
import arrowDown from '../../../../assets/img/icons/arrow-down.png'
import './SelectFilter.css';

const SelectFilter = ({list}) => {  
  const dispatch = useDispatch();

  const listSort = ['Sort By Rating (From High to Low)', 'Sort By Rating (From Low to High)', 'Sort By Price (From High to Low)', 'Sort By Price (From Low to High)'];
  const typeSort = ['rating', 'rating', 'price', 'price'];
  
  const listCategory = ['All Categories', 'Clothes and Accessories'];
  const typeCategory = ['1', '2'];

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

  const handlerOption = (value, index) => {    
    setOption(value);
    setListSwitch(!listSwitch);
    if (listSort.includes(value)) dispatch(sort(typeSort[index]));
    if (listCategory.includes(value)) dispatch(category(typeCategory[index])); 
    if (remains === 'From High to Low') dispatch(ascending(true));  
    if (remains === 'From Low to High') dispatch(ascending(false));    
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
          <li className='SelectFilter__list_item' key={`option_${e}`} onClick={() => handlerOption(e, i)}>{e}</li>
        ))}        
      </ul>
    </div>
  )
}

export default SelectFilter