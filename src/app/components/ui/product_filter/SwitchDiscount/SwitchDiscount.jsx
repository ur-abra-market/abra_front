import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { discount } from '../../../../store/reducers/filterSlice'

import './SwitchDiscount.css'

const SwitchDiscount = () => {
  const dispatch = useDispatch()

  const choiceDiscount = useSelector((state) => state.filter.discount)
  const background = choiceDiscount ? '#000000' : '#e0e0e0'
  const justifyContent = choiceDiscount ? 'end' : 'flex-start'

  return (
    <div className='SwitchDiscount'>
      <div className='SwitchDiscount__label'>Only discounted items</div>
      <div className='SwitchDiscount__box' style={{background, justifyContent}} onClick={() => dispatch(discount(!choiceDiscount))}>
        <div className='SwitchDiscount__box_btn' />
      </div>
    </div>
  )
}

export default SwitchDiscount