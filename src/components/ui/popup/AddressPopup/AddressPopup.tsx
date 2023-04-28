import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { SellerAddressData } from '../../../../services/seller.service';
import { useAppDispatch } from '../../../../store/hooks';
import { Button, Checkbox, Input, Select } from '../../../ui-kit';

import style from './AddressPopup.module.css';

import { addAddress } from 'store/reducers/sellerCheckoutSlice';

interface AddressPopupType {
  modal: boolean;
  setAddModal: (modal: boolean) => void;
}

const schema = yup
  .object({
    phone_country_code: yup.string().required('phone_country_code is required'),
    phone_number: yup.string().required('phone_number is required'),
    first_name: yup.string().required('first_name is required'),
    last_name: yup.string().required('last_name is required'),
    country: yup.string().required('Country is required'),
    area: yup.string().required('Area is required'),
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    building: yup.string().required('Building is required'),
    apartment: yup.string().required('Apartment is required'),
    postal_code: yup.string().required('Postal code is required'),
  })
  .required();
const AddressPopup: FC<AddressPopupType> = ({ modal, setAddModal }): JSX.Element => {
  const dispatch = useAppDispatch();
  const listPhone = [
    { label: '+7', value: '+7' },
    { label: '+90', value: '+90' },
  ];
  const listCountry = [
    { label: 'Russia', value: 'Russia' },
    { label: 'Turkey', value: 'Turkey' },
  ];
  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<SellerAddressData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: SellerAddressData): void => {
    if (!isValid) return;
    dispatch(addAddress(data));
    reset();
    setAddModal(false);
  };
  const onClickModalHandler = (): void => {
    setAddModal(false);
  };

  return (
    <div className={style.address_popup} style={styles}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.address_popup_modal}>
        <div className={style.address_popup_row1}>
          <h4 className={style.address_popup_add_address}>Add Address</h4>
          <div className={style.address_popup_checkbox}>
            <Checkbox className={style.checkbox} variant="default" label="Main Address" />
            <Checkbox
              className={style.checkbox}
              variant="default"
              label="Save the address for next orders"
            />
          </div>
          <Exit
            className={style.address_popup_modal_exit}
            onClick={onClickModalHandler}
          />
        </div>
        <div className={style.address_popup_block}>
          <div className={style.address_popup_block_title}>Recipient Info</div>
          <div className={style.address_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>First name</div>
              <Input
                {...register('first_name')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s first name"
                defaultValue=""
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Last name</div>
              <Input
                {...register('last_name')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s last name"
              />
            </div>
          </div>
          <div className={style.address_popup_phone}>
            <div className={style.address_popup_phone_title}>Personal phone number</div>
            <div className={style.address_popup_phone_number}>
              <div className={style.address_popup_phone_number_select}>
                <Select options={listPhone} {...register('phone_country_code')} />
              </div>
              <Input
                {...register('phone_number')}
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
                {...register('country')}
                options={listCountry}
                placeholder="Select a country"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>State / Province (optional)</div>
              <Input
                {...register('area')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a state or province name"
              />
            </div>
          </div>
          <div className={style.address_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>City / Town</div>
              <Input
                {...register('city')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a city or town name"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Region (optional)</div>
              <Input
                {...register('building')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a state or region name"
              />
            </div>
          </div>
          <div className={style.text_modal}>
            <div className={style.text_modal_title}>Street address</div>
            <Input
              {...register('street')}
              classNameWrapper={style.text_modal_input}
              placeholder="Enter a street name and number"
            />
          </div>
          <div className={style.address_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Apt, suite, office (optional)</div>
              <Input
                {...register('apartment')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a number or a letter"
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Zip Code</div>
              <Input
                {...register('postal_code')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a postal code"
              />
            </div>
          </div>
          <Button
            className={style.address_popup_button}
            type="submit"
            label="Confirm"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressPopup;
