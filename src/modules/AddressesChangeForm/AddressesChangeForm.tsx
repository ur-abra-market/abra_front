import React, { FC } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import style from './AddressesChangeForm.module.scss';

import { DeleteTrashCanIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { PhoneNumberInput } from 'elements';
import { ISellerAddressData } from 'services/seller/seller.serviceTypes';
import { ISellerAddress } from 'store/reducers/seller/profile/slice';
import { deleteSellerAddress } from 'store/reducers/seller/profile/thunks';
import { Button, Checkbox, Input, Label, Select } from 'ui-kit';

interface IAddressesChangeForm {
  onSubmit: (data: ISellerAddress) => Promise<void>;
  isEditForm?: boolean;
  closeModal?: (modal: boolean) => void;
  address?: ISellerAddressData;
  isAddressFormDisable?: boolean;
}

export const AddressesChangeForm: FC<IAddressesChangeForm> = ({
  isEditForm,
  address,
  isAddressFormDisable,
  onSubmit,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext<ISellerAddress>();

  const countries = useAppSelector(state => state.common.countries);
  const listCountry = countries.map(el => ({
    value: el.id,
    label: el.country,
  }));

  const removeAddress = (): void => {
    if (address) {
      dispatch(deleteSellerAddress(address.id));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.address_form}>
      <div className={style.address_form_header}>
        <h4 className={style.address_form_header_title}>
          {isEditForm ? 'Edit Address' : 'Add Address'}
        </h4>
        <div className={style.address_form_checkbox}>
          {isEditForm && (
            <button
              className={style.delete_address}
              onClick={removeAddress}
              type="button"
            >
              <DeleteTrashCanIcon />
              <span>Remove Address</span>
            </button>
          )}
          <Controller
            control={control}
            name="isMain"
            defaultValue={isEditForm ? address?.is_main : undefined}
            render={({ field }) => (
              <Checkbox
                checked={field.value || false}
                className={style.checkbox}
                variant="default"
                label="Main Address"
                onChange={event => field.onChange(event.currentTarget.checked)}
              />
            )}
          />
        </div>
      </div>
      <div className={style.address_form_block}>
        <div className={style.address_form_block_title}>Recipient Info</div>
        <div className={style.address_form_block_row}>
          <div className={style.address_form_item}>
            <Label label="First name">
              <Input
                {...register('firstName')}
                classNameWrapper={style.address_form_input}
                placeholder="Recipient’s first name"
                defaultValue={isEditForm ? address?.first_name : ''}
                error={errors.firstName?.message}
              />
            </Label>
          </div>
          <div className={style.address_form_item}>
            <Label label="Last name">
              <Input
                {...register('lastName')}
                classNameWrapper={style.address_form_input}
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
            countryShort={address?.phone.country.country_short}
          />
        </div>
      </div>
      <div className={style.address_form_block}>
        <div className={style.address_popup_block_title}>Where to deliver</div>
        <div className={style.address_form_block_row}>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Label label="Country">
                <Select
                  {...field}
                  options={listCountry}
                  placeholder="Select a country"
                  padding="23px"
                  className={style.select}
                  error={errors.country?.message}
                  defaultValue={watch('country')}
                  onChange={value => {
                    field.onChange(value.value as number);
                  }}
                />
              </Label>
            )}
          />

          <div className={style.address_form_item}>
            <Label label="State / Province (optional)">
              <Input
                {...register('area')}
                classNameWrapper={style.address_form_input}
                placeholder="Enter a state or province name"
                defaultValue={isEditForm ? address?.area : ''}
                error={errors.area?.message}
              />
            </Label>
          </div>
        </div>
        <div className={style.address_form_block_row}>
          <div className={style.address_form_item}>
            <Label label="City / Town">
              <Input
                {...register('city')}
                classNameWrapper={style.address_form_input}
                placeholder="Enter a city or town name"
                defaultValue={isEditForm ? address?.city : ''}
                error={errors.city?.message}
              />
            </Label>
          </div>
          <div className={style.address_form_block_row}>
            <Label label="Building (optional)">
              <Input
                {...register('building')}
                classNameWrapper={style.address_form_input}
                placeholder="Enter a building number"
                defaultValue={isEditForm ? address?.building : ''}
                error={errors.building?.message}
              />
            </Label>
          </div>
        </div>
        <div className={style.address_form_item}>
          <Label label="Street address">
            <Input
              {...register('street')}
              classNameWrapper={style.address_form_input}
              placeholder="Enter a street name and number"
              defaultValue={isEditForm ? address?.street : ''}
              error={errors.street?.message}
            />
          </Label>
        </div>
        <div className={style.address_form_block_row}>
          <div className={style.address_form_item}>
            <Label label="Apt, suite, office (optional)">
              <Input
                {...register('apartment')}
                classNameWrapper={style.address_form_input}
                placeholder="Enter a number or a letter"
                defaultValue={isEditForm ? address?.apartment : ''}
                error={errors.apartment?.message}
              />
            </Label>
          </div>
          <div className={style.address_form_item}>
            <Label label="Zip Code">
              <Input
                {...register('postalCode')}
                classNameWrapper={style.address_form_input}
                placeholder="Enter a postal code"
                defaultValue={isEditForm ? address?.postal_code : ''}
                error={errors.postalCode?.message}
              />
            </Label>
          </div>
        </div>
        <Button
          className={style.address_form_button}
          type="submit"
          label="Confirm"
          disabled={!isValid || (isEditForm && isAddressFormDisable)}
        />
      </div>
    </form>
  );
};
