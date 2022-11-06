import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import style from './DropDownField.module.css'

const DropDownField = ({ children, title, isShow }) => {
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(!open)
  }

  isShow && !open && setOpen(!open)

  return (
    <div>
      <div className={style.title} onClick={onClick}>
        <p className={style.titleText}>{title}</p>
        <span className={open ? style.arrowOn : style.arrowOff}>&#9660;</span>
      </div>

      {open && <div className={style.children}>{children}</div>}
    </div>
  )
}
DropDownField.proptypes = {
  children: PropTypes.arrayOf(PropTypes.node, PropTypes.array),
  title: PropTypes.string,
  isShow: PropTypes.bool
}
export default DropDownField
