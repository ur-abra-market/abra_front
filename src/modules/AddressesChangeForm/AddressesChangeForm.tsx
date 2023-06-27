import React, { FC } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { DeleteTrashCanIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { PhoneNumberInput } from '../../components';
import { IAddress, ISellerAddressData } from '../../store/reducers/seller/profile/slice';
import { deleteAddress } from '../../store/reducers/sellerCheckoutSlice';
import { Button, Checkbox, Input, Label, Select } from '../../ui-kit';

import style from './AddressesChangeForm.module.scss';

interface IAddressesChangeForm {
  isEditForm?: boolean;
  closeModal?: (modal: boolean) => void;
  address?: IAddress;
}

export const AddressesChangeForm: FC<IAddressesChangeForm> = ({
  isEditForm,
  address,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const listCountry = useAppSelector(state => state.common.countries).map(el => ({
    label: el.country,
    value: el.id,
  }));

  const {
    register,
    control,
    formState: { isValid, errors },
  } = useFormContext<ISellerAddressData>();

  const removeAddress = (): void => {
    if (address) {
      dispatch(deleteAddress(address.id));
    }
  };

  return (
    <>
      <div className={style.address_popup_row1}>
        <h4 className={style.address_popup_add_address}>
          {isEditForm ? 'Edit Address' : 'Add Address'}
        </h4>
        <div className={style.address_popup_checkbox}>
          {isEditForm && (
            <div className={style.edit_address_icon_box}>
              <DeleteTrashCanIcon onClick={removeAddress} />
              <span className={style.delete_address}>Remove Address</span>
            </div>
          )}
          <Controller
            control={control}
            name="isMain"
            render={({ field }) => (
              <Checkbox
                defaultChecked={isEditForm && address?.is_main}
                className={style.checkbox}
                variant="default"
                label="Main Address"
                onChange={event => field.onChange(event.currentTarget.checked)}
              />
            )}
          />
        </div>
      </div>
      <div className={style.address_popup_block}>
        <div className={style.address_popup_block_title}>Recipient Info</div>
        <div className={style.address_popup_block_row2}>
          <div className={style.text_modal}>
            <Label label="First name" htmlFor="firstName">
              <Input
                {...register('firstName')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s first name"
                defaultValue={isEditForm ? address?.first_name : ''}
                error={errors.firstName?.message}
              />
            </Label>
          </div>
          <div className={style.text_modal}>
            <Label label="Last name" htmlFor="lastName">
              <Input
                {...register('lastName')}
                classNameWrapper={style.text_modal_input}
                placeholder="Recipient’s last name"
                defaultValue={isEditForm ? address?.last_name : ''}
                error={errors.lastName?.message}
              />
            </Label>
          </div>
        </div>
        <div className={style.address_popup_phone}>
          <PhoneNumberInput
            label="Personal phone number"
            countryShort={address?.country.country_short}
          />
        </div>
      </div>
      <div className={style.address_popup_block}>
        <div className={style.address_popup_block_title}>Where to deliver</div>
        <div className={style.address_popup_block_row2}>
          <Label label="Country" htmlFor="country">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  defaultValue={isEditForm ? address?.country.country : ''}
                  options={listCountry}
                  placeholder="Select a country"
                  padding="23px"
                  className={style.select}
                  error={errors.country?.message}
                  onChange={event => {
                    field.onChange(event.value);
                  }}
                />
              )}
            />
          </Label>
          <div className={style.text_modal}>
            <Label label="State / Province (optional)" htmlFor="area">
              <Input
                {...register('area')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a state or province name"
                defaultValue={isEditForm ? address?.area : ''}
                error={errors.area?.message}
              />
            </Label>
          </div>
        </div>
        <div className={style.address_popup_block_row2}>
          <div className={style.text_modal}>
            <Label label="City / Town" htmlFor="area">
              <Input
                {...register('city')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a city or town name"
                defaultValue={isEditForm ? address?.city : ''}
                error={errors.city?.message}
              />
            </Label>
          </div>
          <div className={style.text_modal}>
            <Label label="Building (optional)" htmlFor="area">
              <Input
                {...register('building')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a building number"
                defaultValue={isEditForm ? address?.building : ''}
                error={errors.building?.message}
              />
            </Label>
          </div>
        </div>
        <div className={style.text_modal}>
          <Label label="Street address" htmlFor="area">
            <Input
              {...register('street')}
              classNameWrapper={style.text_modal_input}
              placeholder="Enter a street name and number"
              defaultValue={isEditForm ? address?.street : ''}
              error={errors.street?.message}
            />
          </Label>
        </div>
        <div className={style.address_popup_block_row2}>
          <div className={style.text_modal}>
            <Label label="Apt, suite, office (optional)" htmlFor="area">
              <Input
                {...register('apartment')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a number or a letter"
                defaultValue={isEditForm ? address?.apartment : ''}
                error={errors.apartment?.message}
              />
            </Label>
          </div>
          <div className={style.text_modal}>
            <Label label="Zip Code" htmlFor="area">
              <Input
                {...register('postalCode')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a postal code"
                defaultValue={isEditForm ? address?.postal_code : ''}
                error={errors.postalCode?.message}
              />
            </Label>
          </div>
        </div>
        <Button
          className={style.address_popup_button}
          type="submit"
          label="Confirm"
          disabled={!isValid}
        />
      </div>
    </>
  );
};
