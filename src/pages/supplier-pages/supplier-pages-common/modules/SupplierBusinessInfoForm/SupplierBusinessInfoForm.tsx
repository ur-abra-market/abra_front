import React, { FC, useEffect, useRef, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ISupplierBusinessInfoFormData, LoadingStatusEnum } from 'common/types';
import { PhoneNumberInput } from 'elements';
import {
  categoriesSelector,
  countriesSelector,
  getAllCategories,
  numberEmployeesSelector,
} from 'store/reducers/commonSlice';
import {
  supplierBusinessInfoSelector,
  supplierLoadingSelector,
} from 'store/reducers/supplier/profile';
import { Button, Checkbox, Input, Label, Paragraph, Select, Title } from 'ui-kit';

import style from './SupplierBusinessInfoForm.module.scss';

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
  const categories = useAppSelector(categoriesSelector);
  const { businessSector } = useAppSelector(supplierBusinessInfoSelector);
  const numberEmployees = useAppSelector(numberEmployeesSelector);
  const countries = useAppSelector(countriesSelector);
  const isLoading =
    useAppSelector(supplierLoadingSelector).businessInfoLoading ===
    LoadingStatusEnum.Loading;
  const isMounted = useRef(false);
  const [defaultCategory, setDefaultCategory] = useState<any>(undefined);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useFormContext<ISupplierBusinessInfoFormData>();

  const businessSectorData = categories ? categories.filter(c => c.level === 1) : [];

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(getAllCategories());
    }
    isMounted.current = true;
    setDefaultCategory(categories.find(el => el.name === businessSector));
  }, [dispatch, categories, businessSector]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.main_info}>
        <div className={style.select_info_inputs}>
          <Label label="Shop name (will be shown on the profile)">
            <Input
              disabled={isLoading}
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
              <Label label="Your main business sector">
                <Select
                  {...field}
                  className={style.select}
                  disabled={isLoading}
                  error={errors?.businessSector?.message}
                  options={businessSectorData.map(el => ({
                    value: el.id,
                    label: { text: el.name },
                  }))}
                  placeholder="Select"
                  defaultValue={defaultCategory?.id}
                  onChange={value => {
                    field.onChange(String(value.value));
                    setDefaultCategory(value);
                  }}
                />
              </Label>
            )}
          />
        </div>

        <Controller
          control={control}
          name="isManufacturer"
          render={({ field }) => (
            <Checkbox
              checked={field.value || false}
              className={style.checkbox}
              variant="default"
              label="I am a manufacturer"
              onChange={event => field.onChange(event.currentTarget.checked)}
            />
          )}
        />

        <Label label="License or entrepreneur number">
          <Input
            {...register('license')}
            disabled={isLoading}
            error={errors?.license?.message}
            placeholder="000 – 00 – 0000"
          />
        </Label>

        {updateForm && (
          <Paragraph size="s" className={style.license_description}>
            Use the number of any document authorizing the sale
          </Paragraph>
        )}
      </div>

      <div className={style.company_info}>
        <Title as="h2" size="s" className={style.subtitle}>
          Company Info
        </Title>
        <div className={style.select_info_inputs}>
          <Label label="Year established">
            <Input
              disabled={isLoading}
              {...register('yearEstablished')}
              error={errors?.yearEstablished?.message}
              placeholder="Enter the year"
            />
          </Label>

          <Controller
            control={control}
            name="numEmployees"
            render={({ field }) => (
              <Label label="Number of employees">
                <Select
                  {...field}
                  disabled={isLoading}
                  error={errors?.numEmployees?.message}
                  options={numberEmployees.map(el => ({
                    value: el.id,
                    label: { text: el.number },
                  }))}
                  className={style.select}
                  defaultValue={typeof field.value === 'number' ? field.value : undefined}
                  placeholder="Select"
                  onChange={value => {
                    field.onChange(Number(value.value));
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
            <Label label="Country of company registration">
              <Select
                disabled={isLoading}
                {...field}
                defaultValue={typeof field.value === 'number' ? field.value : undefined}
                error={errors?.countryRegistration?.message}
                options={countries.map(el => ({
                  value: el.id,
                  label: { text: el.country },
                }))}
                className={style.select}
                placeholder="Select"
                onChange={value => {
                  field.onChange(Number(value.value));
                }}
              />
            </Label>
          )}
        />

        <Label label="About the business (optional)">
          <Input
            disabled={isLoading}
            {...register('description')}
            error={errors?.description?.message}
            placeholder="Tell more about your company or business"
          />
        </Label>
      </div>

      <div>
        <Title as="h2" size="s" className={style.subtitle}>
          Contacts (optional)
        </Title>
        <PhoneNumberInput
          disabled={isLoading}
          label="Business phone number"
          countryShort={countryShort}
        />
        <div className={style.contacts_inputs}>
          <Label label="Business email address">
            <Input
              disabled={isLoading}
              {...register('email')}
              error={errors?.email?.message}
              width="266px"
              placeholder="business@email.com"
            />
          </Label>

          <Label label="Main company address">
            <Input
              disabled={isLoading}
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
        disabled={!isValid || (!isDirty && isPhoneNumber) || isLoading}
      />
    </form>
  );
};
