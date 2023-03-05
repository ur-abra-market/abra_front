import React, { FC, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { main } from '../../store/reducers/modalSlice'

import style from './Check.module.css'

interface CheckProps {
  label: string
}
const Check: FC<CheckProps> = ({ label }): JSX.Element => {
  const [check, setCheck] = useState(false)
  const [background, setBackground] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!check) setBackground('#dddddd')
    else setBackground('#000000')
  }, [check])

  const handlerCheck = (): void => {
    setCheck(!check)
    switch (label) {
      case 'Main Address':
        dispatch(main(!check))
        break
      default:
        break
    }
  }

  return (
    <div
      role="presentation"
      className={style.check}
      onClick={() => handlerCheck()}
    >
      <div className={style.check_box} style={{ background }}>
        {check && <div className={style.check_box_mark} />}
      </div>
      <div className={style.check_label}>{label}</div>
    </div>
  )
}

export default Check
