import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { AddAddressFormData } from '../../../../services/seller.service';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { address } from '../../../../store/reducers/modalSlice';
import Check from '../../../Check';
import { Button, Input, Select } from '../../../ui-kit';

import style from './AddressPopup.module.css';

import { addAddress } from 'store/reducers/seller.checkoutSlice';

const AddressPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listPhone = [
    { label: '+7', value: '+7' },
    { label: '+90', value: '+90' },
  ];
  const listCountry = [
    { label: 'Russia', value: 'Russia' },
    { label: 'Turkey', value: 'Turkey' },
  ];
  const modal = useAppSelector(state => state.modal.isAddress);

  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AddAddressFormData>();
  // const handlerConfirm = (): void => {
  //   if (arrAddress.length < 2) dispatch(addAddress(place));
  //   dispatch(address(false));
  // };

  const onSubmit: SubmitHandler<AddAddressFormData> = (data: AddAddressFormData) => {
    if (!isValid) return;
    dispatch(addAddress(data));
  };

  return (
    <div className={style.address_popup} style={styles}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.address_popup_modal}>
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
            {/* <TextModal */}
            {/*  {...register('seller_data.first_name')} */}
            {/*  title="First name" */}
            {/*  placeholder="Recipient’s first name" */}
            {/* /> */}
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>First name</div>
              <Input
                {...register('seller_data.first_name')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s first name"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Last name</div>
              <Input
                {...register('seller_data.last_name')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s first name"
              />
            </div>
            {/* <TextModal */}
            {/*  {...register('seller_data.last_name')} */}
            {/*  title="Last name" */}
            {/*  placeholder="Recipient’s last name" */}
            {/* /> */}
          </div>
          <div className={style.address_popup_phone}>
            <div className={style.address_popup_phone_title}>Personal phone number</div>
            <div className={style.address_popup_phone_number}>
              <div className={style.address_popup_phone_number_select}>
                <Select options={listPhone} />
              </div>
              <Input
                classNameWrapper={style.address_popup_input_number}
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
              <Select
                {...register('seller_address_data.country')}
                options={listCountry}
                placeholder="Select a country"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>State / Province (optional)</div>
              <Input
                {...register('seller_address_data.area')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a state or province name"
              />
            </div>
          </div>
          <div className={style.address_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>City / Town</div>
              <Input
                {...register('seller_address_data.city')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a city or town name"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Region (optional)</div>
              <Input
                {...register('seller_address_data.area')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a state or region name"
              />
            </div>
          </div>
          <div className={style.text_modal}>
            <div className={style.text_modal_title}>Street address</div>
            <Input
              {...register('seller_address_data.street')}
              classNameWrapper={style.text_modal_input}
              placeholder="Enter a street name and number"
            />
          </div>
          <div className={style.address_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Apt, suite, office (optional)</div>
              <Input
                {...register('seller_address_data.appartment')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a number or a letter"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Zip Code</div>
              <Input
                {...register('seller_address_data.postal_code')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a postal code"
              />
            </div>
          </div>
        </div>
        <Button
          className={style.address_popup_button}
          type="submit"
          label="Confirm"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default AddressPopup;
