import React, { useState, useEffect } from 'react'
import './Check.css'

const Check = ({label}) => {
  const [check, setCheck] = useState(false);
  const [background, setBackground] = useState(false);
  
  useEffect(() => {
    if (!check) {
      setBackground('#dddddd');      
    } else {
      setBackground('#000000');      
    }    
  }, [check])

  const handlerCheck = () => {
    setCheck(!check);    
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