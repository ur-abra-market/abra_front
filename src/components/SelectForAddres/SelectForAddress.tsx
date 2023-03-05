import React, { FC, useState } from 'react'

import { useDispatch } from 'react-redux'

import arrowDown from '../../assets/img/icons/select-down-arrow.svg'
import { category, sort } from '../../store/reducers/filterSlice'

import style from './SelectForAddres.module.css'

interface SelectForAddressProps {
  list: any[]
}
const SelectForAddress: FC<SelectForAddressProps> = ({ list }): JSX.Element => {
  const dispatch = useDispatch()

  const listPhone = ['+7', '+90']
  const typeSort = ['rating', 'price_high_to_low)', 'price_low_to_high)']

  const listCountry = ['Select a country', 'Russia', 'Turkey']
  const typeCategory = ['all', 'clothes']

  const [option, setOption] = useState(list[0])
  const [listSwitch, setListSwitch] = useState(false)
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
    width: list[0] === '+7' ? '166px' : '318px'
  }

  // TODO - исправить - нрязь только через useEffect
  const switchList = (e: any): void => {
    e.preventDefault()
    const nameClass = e.relatedTarget.className

    if (!nameClass.includes('Select')) {
      setTimeout(() => {
        setListSwitch(false)
      }, 100)
    }
  }

  const handlerOption = (value: any, index: number): void => {
    setOption(value)
    setListSwitch(!listSwitch)
    if (listPhone.includes(value)) dispatch(sort(typeSort[index]))
    if (listCountry.includes(value)) dispatch(category(typeCategory[index]))
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div className={style.select} onMouseOut={(e) => switchList(e)}>
      <div
        role="presentation"
        className={style.select_select}
        onClick={() => setListSwitch(!listSwitch)}
      >
        <div
          className={style.select_text}
          style={{
            color: option === 'Select a country' ? '#828282' : '#000000'
          }}
        >
          {option}
        </div>
        <div className={style.select_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.select_list} style={styleList}>
        {list.map((e, i) => (
          <li
            role="presentation"
            className={style.select_list_item}
            key={`option_${e}`}
            onClick={() => handlerOption(e, i)}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectForAddress
