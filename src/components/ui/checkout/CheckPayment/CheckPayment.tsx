import React from 'react'

import { useDispatch } from 'react-redux'

import { payment } from '../../../../store/reducers/modalSlice'

import style from './CheckPayment.module.css'

const CheckPayment = (): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <div className={style.check_payment}>
      <div className={style.check_payment_block}>
        <h4>Payment Method</h4>
        <div className={style.check_payment_block_kind}>
          <div className={style.check_payment_block_kind_box} />
          <div className={style.check_payment_block_kind_cart} />
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={style.check_payment_add}
        onClick={() => dispatch(payment(true))}
      >
        + Add a credit or debit card
      </div>
    </div>
  )
}

export default CheckPayment
