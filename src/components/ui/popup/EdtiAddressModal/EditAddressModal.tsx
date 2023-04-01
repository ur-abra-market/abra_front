import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { ReactComponent as Delete } from '../../../../assets/img/icons/delete.svg';
import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import {
  ISellerAddressData,
  PayloadEditAddress,
} from '../../../../services/seller.service';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import Check from '../../../Check';
import { Button, Input, Select } from '../../../ui-kit';

import style from './EditAddressModal.module.css';

import { editAddress } from 'store/reducers/sellerCheckoutSlice';

interface EditAddressModalType {
  modal: boolean;
  setModal: (modal: boolean) => void;
  data: ISellerAddressData;
}
export const EditAddressModal: FC<EditAddressModalType> = ({
  data,
  modal,
  setModal,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { last_name, first_name } = useAppSelector(state => state.seller.userProfileInfo);
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
    handleSubmit,
    formState: { isValid },
  } = useForm<PayloadEditAddress>({
    mode: 'all',
  });

  const onSubmit = (data: PayloadEditAddress): void => {
    if (!isValid) return;
    dispatch(editAddress(data));
    setModal(false);
  };
  const onClickModalHandler = (): void => {
    setModal(false);
  };

  return (
    <div className={style.edit_address} style={styles}>
      <div className={style.edit_address_modal}>
        <div className={style.edit_address_row1}>
          <h4 className={style.edit_address_edit_address}>Edit Address</h4>
          <div className={style.edit_address_checkbox}>
            <Check label="Main Address" />
            <div className={style.edit_address_icon_box}>
              <Delete />
              <span>Remove Address</span>
            </div>
          </div>
          <Exit className={style.edit_address_modal_exit} onClick={onClickModalHandler} />
        </div>
        <div className={style.edit_address_block}>
          <div className={style.edit_address_block_title}>Recipient Info</div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>First name</div>
              <Input
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s first name"
                defaultValue={first_name}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Last name</div>
              <Input
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s last name"
                defaultValue={last_name}
              />
            </div>
          </div>
          <div className={style.edit_address_phone}>
            <div className={style.edit_address_phone_title}>Personal phone number</div>
            <div className={style.edit_address_phone_number}>
              <div className={style.edit_address_phone_number_select}>
                <Select options={listPhone} />
              </div>
              <Input
                classNameWrapper={style.edit_address_input_number}
                placeholder="(XXX) XXX - XX - XX"
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.edit_address_block}>
          <div className={style.edit_address_block_title}>Where to deliver</div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_block_row2_box}>
              <div
                className={style.edit_address_block_row2_box_title}
                style={{ marginTop: '0px' }}
              >
                Country
              </div>
              <Select
                {...register('country')}
                options={listCountry}
                placeholder="Select a country"
                defaultValue={data.country}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>
                State / Province (optional)
              </div>
              <Input
                {...register('area')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a state or province name"
                defaultValue={data.area}
              />
            </div>
          </div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>City / Town</div>
              <Input
                {...register('city')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a city or town name"
                defaultValue={data.city}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Region (optional)</div>
              <Input
                {...register('area')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a state or region name"
                defaultValue={data.area}
              />
            </div>
          </div>
          <div className={style.edit_address_text_modal}>
            <div className={style.edit_address_text_modal_title}>Street address</div>
            <Input
              {...register('street')}
              classNameWrapper={style.edit_address_text_modal_input}
              placeholder="Enter a street name and number"
              defaultValue={data.street}
            />
          </div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>
                Apt, suite, office (optional)
              </div>
              <Input
                {...register('appartment')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a number or a letter"
                defaultValue={data.appartment}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Zip Code</div>
              <Input
                {...register('postal_code')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a postal code"
                defaultValue={data.postal_code}
              />
            </div>
          </div>
          <Button
            className={style.edit_address_button}
            type="submit"
            label="Confirm"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};
