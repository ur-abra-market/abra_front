import React from 'react';

import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addAddress, address } from '../../../../store/reducers/modalSlice';
import Check from '../../../Check';
import SelectForAddress from '../../../SelectForAddres';
import TextModal from '../../../TextModal';
import { Button } from '../../../ui-kit';

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
  const handlerConfirm = (): void => {
    if (arrAddress.length < 2) dispatch(addAddress(place));
    dispatch(address(false));
  };

  return (
    <div className={style.address_popup} style={styles}>
      <div className={style.address_popup_modal}>
        <div className={style.address_popup_row1}>
          <h4 className={style.address_popup_add_address}>Add Address</h4>
          <div className={style.address_popup_checkbox}>
            <Check label="Main Address" />
            <Check label="Save the address for next orders" />
          </div>
          <Exit
            className={style.address_popup_modal_exit}
            onClick={() => dispatch(address(false))}
          />
        </div>
        <div className={style.address_popup_block}>
          <div className={style.address_popup_block_title}>Recipient Info</div>
          <div className={style.address_popup_block_row2}>
            <TextModal title="First name" placeholder="Recipient’s first name" />
            <TextModal title="Last name" placeholder="Recipient’s last name" />
          </div>
          <div className={style.address_popup_phone}>
            <div className={style.address_popup_phone_title}>Personal phone number</div>
            <div className={style.address_popup_phone_number}>
              <div className={style.address_popup_phone_number_select}>
                <SelectForAddress list={listPhone} />
              </div>
              <input
                className={style.address_popup_input_number}
                type="text"
                placeholder="(XXX) XXX - XX - XX"
              />
            </div>
          </div>
        </div>
        <div className={style.address_popup_block}>
          <div className={style.address_popup_block_title}>Where to deliver</div>
          <div className={style.address_popup_block_row2}>
            <div className={style.address_popup_block_row2_box}>
              <div
                className={style.address_popup_block_row2_box_title}
                style={{ marginTop: '0px' }}
              >
                Country
              </div>
              <SelectForAddress list={listCountry} />
            </div>
            <TextModal
              title="State / Province (optional)"
              placeholder="Enter a state or province name"
            />
          </div>
          <div className={style.address_popup_block_row2}>
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
          <div className={style.address_popup_block_row2}>
            <TextModal
              title="Apt, suite, office (optional)"
              placeholder="Enter a number or a letter"
            />
            <TextModal title="Zip Code" placeholder="Enter a postal code" />
          </div>
        </div>
        <Button className={style.address_popup_button} onClick={() => handlerConfirm()}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AddressPopup;
