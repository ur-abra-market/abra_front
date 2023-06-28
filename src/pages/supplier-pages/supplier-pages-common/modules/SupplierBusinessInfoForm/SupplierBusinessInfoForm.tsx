import React, { FC, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import style from './SupplierBusinessInfoForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ISupplierBusinessInfoFormData } from 'common/types';
import { PhoneNumberInput } from 'elements';
import {
  countriesSelector,
  getCompanyNumberEmployees,
  numberEmployeesSelector,
} from 'store/reducers/commonSlice';
import { Button, Checkbox, Input, ISelectOption, Label, Select } from 'ui-kit';

const BUSINESS_SECTOR_DATA: ISelectOption[] = [
  { label: 'Clothes', value: 'Clothes' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Electronics', value: 'Electronics' },
];

interface IBusinessProfileForm {
  updateForm?: boolean;
  countryShort?: string;
  onSubmit: (data: ISupplierBusinessInfoFormData) => void;
  isPhoneNumber?: boolean;
  isDirty?: boolean;
}

export const SupplierBusinessInfoForm: FC<IBusinessProfileForm> = ({
  updateForm,
  onSubmit,
  countryShort,
  isPhoneNumber,
  isDirty,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const numberEmployees = useAppSelector(numberEmployeesSelector);
  const countries = useAppSelector(countriesSelector);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useFormContext<ISupplierBusinessInfoFormData>();

  useEffect(() => {
    dispatch(getCompanyNumberEmployees());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.main_info}>
        <div className={style.select_info_inputs}>
          <Label label="Shop name* (will be shown on the profile)">
            <Input
              {...register('storeName')}
              error={errors?.storeName?.message}
              placeholder="Enter your company or store name"
              className={style.shop_name}
            />
          </Label>

          <Controller
            control={control}
            name="businessSector"
            render={({ field }) => (
              <Label label="Your main business sector*">
                <Select
                  {...field}
                  error={errors?.businessSector?.message}
                  options={BUSINESS_SECTOR_DATA}
                  placeholder="Select"
                  defaultValue={field?.value?.value}
                  onChange={value => {
                    field.onChange(value);
                  }}
                />
              </Label>
            )}
          />
        </div>

        <Checkbox
          className={style.checkbox}
          label="I am a manufacturer"
          variant="default"
          size="sm"
        />

        <Label label="License or entrepreneur number*">
          <Input
            {...register('license')}
            error={errors?.license?.message}
            placeholder="000 – 00 – 0000"
          />
        </Label>

        {updateForm && (
          <p className={style.license_description}>
            Use the number of any document authorizing the sale
          </p>
        )}
      </div>

      <div className={style.company_info}>
        <p className={style.subtitle}>Company Info (optional)</p>
        <div className={style.select_info_inputs}>
          <Label label="Year established*">
            <Input
              {...register('yearEstablished')}
              error={errors?.yearEstablished?.message}
              placeholder="Enter the year"
            />
          </Label>

          <Controller
            control={control}
            name="numEmployees"
            render={({ field }) => (
              <Label label="Number of employees*">
                <Select
                  {...field}
                  error={errors?.numEmployees?.message}
                  options={numberEmployees.map(el => ({
                    value: el.id,
                    label: el.number,
                  }))}
                  className={style.select}
                  defaultValue={
                    numberEmployees?.find(el => field.value === el.id)?.number
                  }
                  placeholder="Select"
                  width="266px"
                  onChange={value => {
                    field.onChange(value.value);
                  }}
                />
              </Label>
            )}
          />
        </div>

        <Controller
          control={control}
          name="countryRegistration"
          render={({ field }) => (
            <Label label="Country of company registration*">
              <Select
                {...field}
                defaultValue={countries?.find(el => el.id === field.value)?.country}
                error={errors?.countryRegistration?.message}
                options={countries.map(el => ({
                  value: el.id,
                  label: el.country,
                }))}
                placeholder="Select"
                onChange={value => {
                  field.onChange(value.value);
                }}
              />
            </Label>
          )}
        />

        <Label label="About the business">
          <Input
            {...register('description')}
            error={errors?.description?.message}
            placeholder="Tell more about your company or business"
          />
        </Label>
      </div>

      <div>
        <p className={style.subtitle}>Contacts</p>
        <PhoneNumberInput label="Business phone number" countryShort={countryShort} />
        <div className={style.contacts_inputs}>
          <Label label="Business email address">
            <Input
              {...register('email')}
              error={errors?.email?.message}
              width="266px"
              placeholder="business@email.com"
            />
          </Label>

          <Label label="Main company address">
            <Input
              {...register('address')}
              error={errors?.address?.message}
              placeholder="Enter address"
            />
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className={style.button}
        label="Save"
        disabled={!isValid || (!isDirty && isPhoneNumber)}
      />
    </form>
  );
};
