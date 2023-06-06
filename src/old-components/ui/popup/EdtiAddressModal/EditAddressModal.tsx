import { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../common/hooks';
import Check from '../../../Check';

import style from './EditAddressModal.module.css';

import { DeleteTrashCanIcon, CrossRedIcon } from 'assets/icons'; // 16px for CrossRedIcon
import { SellerAddressData } from 'services/seller/seller.serviceTypes';
import { deleteAddress, editAddress } from 'store/reducers/sellerCheckoutSlice';
import { Button, Input, Select } from 'ui-kit';

interface EditAddressModalType {
  modal: boolean;
  setModal: (modal: boolean) => void;
  dataArr: SellerAddressData;
}
export const EditAddressModal: FC<EditAddressModalType> = ({
  dataArr,
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
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SellerAddressData>({
    mode: 'all',
  });

  const onSubmit = (data: SellerAddressData): void => {
    if (!isValid) return;
    dispatch(editAddress({ id: dataArr.id, data }));
    setModal(false);
  };
  const onClickModalHandler = (): void => {
    setModal(false);
  };
  const removeAddress = (): void => {
    dispatch(deleteAddress(dataArr.id));
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
              <DeleteTrashCanIcon onClick={removeAddress} />
              <span className={style.delete_address}>Remove Address</span>
            </div>
          </div>
          <CrossRedIcon
            className={style.edit_address_modal_exit}
            onClick={onClickModalHandler}
          />
        </div>
        <div className={style.edit_address_block}>
          <div className={style.edit_address_block_title}>Recipient Info</div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>First name</div>
              <Input
                {...register('first_name')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s first name"
                defaultValue={dataArr.first_name}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Last name</div>
              <Input
                {...register('last_name')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Recipient’s last name"
                defaultValue={dataArr.last_name}
              />
            </div>
          </div>
          <div className={style.edit_address_phone}>
            <div className={style.edit_address_phone_title}>Personal phone number</div>
            <div className={style.edit_address_phone_number}>
              <div className={style.edit_address_phone_number_select}>
                <Controller
                  control={control}
                  name="phone_country_code"
                  render={({ field }) => (
                    <Select
                      options={listPhone}
                      padding="23px"
                      className={style.select}
                      onChange={value => {
                        field.onChange(value.value);
                      }}
                    />
                  )}
                />
              </div>
              <Input
                {...register('phone_number')}
                classNameWrapper={style.edit_address_input_number}
                placeholder="(XXX) XXX - XX - XX"
                defaultValue={dataArr.phone_number}
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
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <Select
                    options={listCountry}
                    placeholder="Select a country"
                    padding="23px"
                    className={style.select}
                    onChange={value => {
                      field.onChange(value.value);
                    }}
                  />
                )}
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
                defaultValue={dataArr.area}
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
                defaultValue={dataArr.city}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Region (optional)</div>
              <Input
                {...register('area')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a state or region name"
                defaultValue={dataArr.area}
              />
            </div>
          </div>
          <div className={style.edit_address_text_modal}>
            <div className={style.edit_address_text_modal_title}>Street address</div>
            <Input
              {...register('street')}
              classNameWrapper={style.edit_address_text_modal_input}
              placeholder="Enter a street name and number"
              defaultValue={dataArr.street}
            />
          </div>
          <div className={style.edit_address_block_row2}>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>
                Apt, suite, office (optional)
              </div>
              <Input
                {...register('apartment')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a number or a letter"
                defaultValue={dataArr.apartment}
              />
            </div>
            <div className={style.edit_address_text_modal}>
              <div className={style.edit_address_text_modal_title}>Zip Code</div>
              <Input
                {...register('postal_code')}
                classNameWrapper={style.edit_address_text_modal_input}
                placeholder="Enter a postal code"
                defaultValue={dataArr.postal_code}
              />
            </div>
          </div>
          <Button
            className={style.edit_address_button}
            type="submit"
            label="Confirm"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};
