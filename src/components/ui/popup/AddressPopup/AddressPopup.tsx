import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addAddress, address } from '../../../../store/reducers/modalSlice';
import Check from '../../../Check';
import SelectForAddres from '../../../SelectForAddres';
import TextModal from '../../../TextModal';

import style from './AddressPopup.module.css';

const AddressPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listPhone = ['+7', '+90'];
  const listCountry = ['Select a country', 'Russia', 'Turkey'];
  const modal = useAppSelector(state => state.modal.isAddress);
  const arrAddress = useAppSelector(state => state.modal.addresses);
  const place = useAppSelector(state => state.modal.address);

  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };
  const handlerConfirm = () => {
    if (arrAddress.length < 2) dispatch(addAddress(place));
    dispatch(address(false));
  };

  return (
    <div className={style.addressPopup} style={styles}>
      <div className={style.addressPopup__modal}>
        <div
          className={style.addressPopup__modal_exit}
          onClick={() => dispatch(address(false))}
        />
        <div className={style.addressPopup__row1}>
          <h4>Add Address</h4>
          <div className={style.addressPopup__checkbox}>
            <Check label="Main Address" />
            <Check label="Save the address for next orders" />
          </div>
        </div>
        <div className={style.addressPopup__block}>
          <div className={style.addressPopup__block_title}>Recipient Info</div>
          <div className={style.addressPopup__block_row2}>
            <TextModal title="First name" placeholder="Recipient’s first name" />
            <TextModal title="Last name" placeholder="Recipient’s last name" />
          </div>
          <div className={style.addressPopup__phone}>
            <div className={style.addressPopup__phone_title}>Personal phone number</div>
            <div className={style.addressPopup__phone_number}>
              <div className={style.addressPopup__phone_number_select}>
                <SelectForAddres list={listPhone} />
              </div>
              <input type="text" placeholder="(XXX) XXX - XX - XX" />
            </div>
          </div>
        </div>
        <div className={style.addressPopup__block}>
          <div className={style.addressPopup__block_title}>Where to deliver</div>
          <div className={style.addressPopup__block_row2}>
            <div className={style.addressPopup__block_row2_box}>
              <div
                className={style.addressPopup__block_row2_box_title}
                style={{ marginTop: '0px' }}
              >
                Country
              </div>
              <SelectForAddres list={listCountry} />
            </div>
            <TextModal
              title="State / Province (optional)"
              placeholder="Enter a state or province name"
            />
          </div>
          <div className={style.addressPopup__block_row2}>
            <TextModal title="City / Town" placeholder="Enter a city or town name" />
            <TextModal
              title="Region (optional)"
              placeholder="Enter a state or region name"
            />
          </div>
          <TextModal
            title="Street address"
            placeholder="Enter a street name and number"
          />
          <div className={style.addressPopup__block_row2}>
            <TextModal
              title="Apt, suite, office (optional)"
              placeholder="Enter a number or a letter"
            />
            <TextModal title="Zip Code" placeholder="Enter a postal code" />
          </div>
        </div>
        <div className={style.addressPopup__button} onClick={() => handlerConfirm()}>
          Confirm
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
