import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { payment } from '../../../../store/reducers/modalSlice';
import Check from '../../../common/Check'
import TextModal from '../../../common/TextModal'
import './PaymentPopup.css'

const PaymentPopup = () => {
  const dispatch = useDispatch();  
  const modal = useSelector((state) => state.modal.isPayment);  
  const style = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0'
  } 
  
  return (
    <div className='PaymentPopup' style={style}>
      <div className='PaymentPopup__modal'>
        <div className='PaymentPopup__modal_exit' onClick={() => dispatch(payment(false))}/>
        <div className='PaymentPopup__row1'>
          <h4>Add payment</h4>
          <Check label='Save the card for next orders' />          
        </div>
        <div className='PaymentPopup__block'>
          <div className='PaymentPopup__block_title'>Card Info</div>
          <TextModal title='Card number' placeholder='Enter a card number'/>
          <TextModal title='Card Holder' placeholder='Enter the first and last name'/>
          <div className='PaymentPopup__block_row2'>
            <TextModal title='Expiration date' placeholder='MM/YY'/>
            <TextModal title='CVV/CSC' placeholder='Enter a 3-4 digits code'/>                                               
          </div>          
        </div>          
        <div className='PaymentPopup__button'>Confirm</div>            
      </div>            
    </div>
  )
}

export default PaymentPopup