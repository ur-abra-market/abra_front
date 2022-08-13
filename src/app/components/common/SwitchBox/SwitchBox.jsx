import React, { useState, useEffect } from 'react'
import './SwitchBox.css'

const SwitchBox = ({label}) => {
  const [check, setCheck] = useState(false)
  const [background, setBackground] = useState('#e0e0e0');
  const [justifyContent, setJustifyContent] = useState('flex-start');

  useEffect(() => {
    if (!check) {
      setBackground('#e0e0e0');
      setJustifyContent('flex-start');
    } else {
      setBackground('#000000');
      setJustifyContent('end');
    }
  }, [check])

    return (
    <div className='SwitchBox'>
      <div className='SwitchBox__label'>{label}</div>
      <div className='SwitchBox__box' style={{background, justifyContent}} onClick={() => setCheck(!check)}>
        <div className='SwitchBox__box_btn' />
      </div>
    </div>
  )
}

export default SwitchBox