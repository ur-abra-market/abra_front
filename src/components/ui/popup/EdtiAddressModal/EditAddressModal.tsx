import React, { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

// import { ReactComponent as Delete } from '../../../../assets/img/icons/delete.svg';
import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { AddAddressFormData } from '../../../../services/seller.service';
import { useAppDispatch } from '../../../../store/hooks';
import Check from '../../../Check';
import { Button, Input, Select } from '../../../ui-kit';

import style from './EditAddressModal.module.css';

import { addAddress } from 'store/reducers/seller.checkoutSlice';

interface EditAddressModalType {
  modal: boolean;
  setModal: (modal: boolean) => void;
  data: AddAddressFormData;
}
export const EditAddressModal: FC<EditAddressModalType> = ({
  data,
  modal,
  setModal,
}): JSX.Element => {
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
    handleSubmit,
    formState: { isValid },
  } = useForm<AddAddressFormData>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<AddAddressFormData> = (
    data: AddAddressFormData,
  ): void => {
    if (!isValid) return;
    dispatch(addAddress(data));
    setModal(false);
  };
  const onClickModalHandler = (): void => {
    setModal(false);
  };

  return (
    <div className={style.edit_address} style={styles}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.edit_address_modal}>
        <div className={style.edit_address_row1}>
          <h4 className={style.edit_address_edit_address}>Edit Address</h4>
          <div className={style.edit_address_checkbox}>
            <Check label="Main Address" />
            <div className={style.edit_address_icon_box}>
              {/* //FIXME в репе нет иконки - у тебя в git ignore скорее стоит */}
              {/* <Delete /> */}
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
                {...register('seller_data.first_name')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s first name"
                defaultValue={data.seller_data.first_name}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Last name</div>
              <Input
                {...register('seller_data.last_name')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s last name"
                defaultValue={data.seller_data.last_name}
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
        <div className={style.edit_address_block}>
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
                {...register('seller_address_data.country')}
                options={listCountry}
                placeholder="Select a country"
                defaultValue={data.seller_address_data.country}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>
                State / Province (optional)
              </div>
              <Input
                {...register('seller_address_data.area')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a state or province name"
                defaultValue={data.seller_address_data.area}
              />
            </div>
          </div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>City / Town</div>
              <Input
                {...register('seller_address_data.city')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a city or town name"
                defaultValue={data.seller_address_data.city}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Region (optional)</div>
              <Input
                {...register('seller_address_data.area')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a state or region name"
                defaultValue={data.seller_address_data.area}
              />
            </div>
          </div>
          <div className={style.edit_address_text_modal}>
            <div className={style.edit_address_text_modal_title}>Street address</div>
            <Input
              {...register('seller_address_data.street')}
              classNameWrapper={style.edit_address_text_modal_input}
              placeholder="Enter a street name and number"
              defaultValue={data.seller_address_data.street}
            />
          </div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>
                Apt, suite, office (optional)
              </div>
              <Input
                {...register('seller_address_data.appartment')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a number or a letter"
                defaultValue={data.seller_address_data.appartment}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Zip Code</div>
              <Input
                {...register('seller_address_data.postal_code')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a postal code"
                defaultValue={data.seller_address_data.postal_code}
              />
            </div>
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
  );
};
