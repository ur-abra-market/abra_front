import React, { useState } from 'react'
import arrowDown from '../../../assets/img/icons/arrow-down.png'
import style from './SelectShip.module.css'

const SelectShip = () => {
  const [option, setOption] = useState('Ship to')
  const [list, setList] = useState(false)
  const styleList = {
    height: list ? 'fit-content' : '0px'
  }
  return (
    <div className={style.header__ship}>
      <div className={style.ship_select} onClick={() => setList(!list)}>
        <div className={style.select_text}>{option}</div>
        <div className={style.select_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.ship_list_options} style={styleList}>
        <li
          className={style.ship_option}
          onClick={() => {
            setOption('Ship to')
            setList(!list)
          }}
        >
          Ship to
        </li>
        <li
          className={style.ship_option}
          onClick={() => {
            setOption('Ship from')
            setList(!list)
          }}
        >
          Ship from
        </li>
      </ul>
    </div>
  )
}

export default SelectShip
