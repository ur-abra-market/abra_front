import React from 'react'
import './TextModal.css'

const TextModal = ({title, placeholder}) => {  
  return (
    <div className='TextModal'>
      <div className='TextModal-title'>{title}</div>
      <input className='TextModal-input' type="text" placeholder={placeholder}/>
    </div>
  )
}

export default TextModal