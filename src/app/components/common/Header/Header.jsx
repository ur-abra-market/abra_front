import React from 'react'
import Search from '../Search/Search'
import ButtonHeader from '../ButtonHeader/ButtonHeader';
import HeaderNavMenu from '../HeaderNavMemu/HeaderNavMenu';
import SelectCurrency  from '../SelectCurrency/SelectCurrency';
import SelectShip from '../SelectShip/SelectShip';
import imgBtnHeader from '../../../assets/img/icons/icon-img.png';
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__basic'>
        <div className='header__basic_logo'>Abra</div>
        <Search />
        <div className='header__basic_buttons'>
          <ButtonHeader name='My Profile' imgSrc={imgBtnHeader} />
          <ButtonHeader name='Notifications' imgSrc={imgBtnHeader} />
          <ButtonHeader name='Favorites' imgSrc={imgBtnHeader} />
          <ButtonHeader name='Cart' imgSrc={imgBtnHeader} />
        </div>        
      </div>
      <div className='header__menu'>
        <div className='header__menu_categories'>
          <div>All categories</div>
          <div className='dividing-line-1'>|</div>
        </div>        
        <HeaderNavMenu />
        <div className='heder__selects'>
          <div className='dividing-line-2'>|</div> 
          <SelectCurrency  />         
          <SelectShip />
        </div>
        
      </div>      
    </header>
  )
}

export default Header