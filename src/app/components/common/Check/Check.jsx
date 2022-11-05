import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { main } from '../../../store/reducers/modalSlice';
import './Check.css'

const Check = ({label}) => {
  const [check, setCheck] = useState(false);
  const [background, setBackground] = useState(false);
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    if (!check) {
      setBackground('#dddddd');      
    } else {
      setBackground('#000000');      
    }    
  }, [check])

  const handlerCheck = () => {
    setCheck(!check);   
    switch (label) {
      case 'Main Address':
        dispatch(main(!check));        
        break;    
      default:
        break;
    } 
  }

  return (
    <div className='Check' onClick={() => handlerCheck()}>      
      <div className='Check__box' style={{background}}>
        {check ? <div className='Check__box_mark' /> : <></>}
      </div>
      <div className='Check__label'>{label}</div>
    </div>
  )
}

export default Check