import React from 'react'
import './TextModal.css'

const TextModal = ({title, placeholder}) => {  
  
  const handlerText = () => {

  }
  
  return (
    <div className='TextModal'>
      <div className='TextModal-title'>{title}</div>
      <input className='TextModal-input' type="text" placeholder={placeholder} onChange={() => handlerText()}/>
    </div>
  )
}

export default TextModal