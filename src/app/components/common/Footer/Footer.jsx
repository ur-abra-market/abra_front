import React from 'react';
import HeaderNavMenu from '../HeaderNavMemu/HeaderNavMenu';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import SelectShip from '../SelectShip/SelectShip';
import './Footer.css'

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='Footer__basic'>
        <div className='Footer__basic_logo'>Abra</div>
        <HeaderNavMenu />
        <div className='Footer__selects'>
          <div className='dividing-line-2'>|</div> 
          <SelectCurrency  />         
          <SelectShip />
        </div>
      </div>

      <div className='Footer__add'>
        <div className='Footer__add_text1'>© Copyright 2022</div>
        <div className='Footer__add_text2'>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div> 
        <div className='Footer__add_text1'></div>       
      </div>
    </div>
  )
}

export default Footer