import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { address, addAddress, addressNull } from '../../../../store/reducers/modalSlice';
import Check from '../../../common/Check'
import Select from '../../../common/Select'
import TextModal from '../../../common/TextModal'
import './AddressPopup.css'

const AddressPopup = () => {
  const dispatch = useDispatch();   
  const listPhone = ['+7', '+90'];
  const listCountry = ['Select a country', 'Russia', 'Turkey'];
  const modal = useSelector((state) => state.modal.isAddress);
  const arrAddress = useSelector((state) => state.modal.addresses);
  const place = useSelector((state) => state.modal.address);
  
  const style = {
    scale: modal ? '1' : '0'
  } 
  const handlerConfirm = () => {    
    if (arrAddress.length < 2) dispatch(addAddress(place));    
    dispatch(address(false));
  }

  return (
    <div className='AddressPopup' style={style}>
      <div className='AddressPopup__modal'>
        <div className='AddressPopup__modal_exit' onClick={() => dispatch(address(false))}/>
        <div className='AddressPopup__row1'>
          <h4>Add Address</h4>
          <div className='AddressPopup__checkbox'>
            <Check label='Main Address' />
            <Check label='Save the address for next orders' />
          </div>          
        </div>
        <div className='AddressPopup__block'>
          <div className='AddressPopup__block_title'>Recipient Info</div>
          <div className='AddressPopup__block_row2'>
            <TextModal title='First name' placeholder='Recipient’s first name'/>
            <TextModal title='Last name' placeholder='Recipient’s last name'/>                                               
          </div>
          <div className='AddressPopup__phone'>
            <div className='AddressPopup__phone_title'>Personal phone number</div>
            <div className='AddressPopup__phone_number'>
              <div className='AddressPopup__phone_number-select'>
                <Select list={listPhone}/>
              </div>
              <input type="text" placeholder='(XXX) XXX - XX - XX'/>                              
            </div>              
          </div>
        </div> 
        <div className='AddressPopup__block'>
          <div className='AddressPopup__block_title'>Where to deliver</div>
          <div className='AddressPopup__block_row2'>
            <div className='AddressPopup__block_row2-box'>
              <div className='AddressPopup__block_row2-box-title' style={{marginTop: '0px'}}>Country</div>
              <Select list={listCountry}/>
            </div>
            <TextModal title={'State / Province (optional)'} placeholder='Enter a state or province name'/>                                                
          </div>
          <div className='AddressPopup__block_row2'>
            <TextModal title='City / Town' placeholder='Enter a city or town name'/>
            <TextModal title='Region (optional)' placeholder='Enter a state or region name'/>                                                            
          </div> 
          <TextModal title='Street address' placeholder='Enter a street name and number' />
          <div className='AddressPopup__block_row2'>
            <TextModal title={'Apt, suite, office (optional)'} placeholder='Enter a number or a letter'/>
            <TextModal title='Zip Code' placeholder='Enter a postal code' />                                                            
          </div> 
        </div>  
        <div className='AddressPopup__button' onClick={() => handlerConfirm()}>Confirm</div>            
      </div>            
    </div>
  )
}

export default AddressPopup