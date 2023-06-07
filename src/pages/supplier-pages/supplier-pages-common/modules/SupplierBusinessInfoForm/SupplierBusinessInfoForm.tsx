import React, { FC, useEffect } from 'react';

import cn from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import {
  getCompanyNumberEmployees,
  numberEmployeesSelector,
} from '../../../../../store/reducers/commonSlice';
import {
  Button,
  Checkbox,
  Input,
  ISelectOption,
  Label,
  Select,
} from '../../../../../ui-kit';

import style from './SupplierBusinessInfoForm.module.scss';
import { ISupplierBusinessInfoFormValues } from './supplierBusinessInfoFormInterfaces';

const BUSINESS_SECTOR_DATA: ISelectOption[] = [
  { label: 'Clothes', value: 'Clothes' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Electronics', value: 'Electronics' },
];

interface IBusinessProfileForm {
  updateForm?: boolean;
  onSubmit: (data: any) => void;
}

export const SupplierBusinessInfoForm: FC<IBusinessProfileForm> = ({
  updateForm,
  onSubmit,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const numberEmployees = useAppSelector(numberEmployeesSelector);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useFormContext<ISupplierBusinessInfoFormValues>();

  useEffect(() => {
    dispatch(getCompanyNumberEmployees());
  }, []);

  const selectCompanyClasses = cn(style.select_company, {
    [style.select_update_company]: updateForm,
  });

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

          <div className={style.select_width} />
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
                />
              </Label>
            )}
          />
        </div>

        <div className={selectCompanyClasses}>
          <Checkbox
            className={style.checkbox}
            label="I am a manufacturer"
            variant="default"
            size="sm"
          />

          <Label label="License or entrepreneur number*">
            <Input
              {...register('entrepreneurNumber')}
              error={errors?.entrepreneurNumber?.message}
              placeholder="000 – 00 – 0000"
            />
          </Label>

          <p className={style.explanatory_form}>
            Use the number of any document authorizing the sale
          </p>
        </div>
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

        <Label label="About the business">
          <Input
            {...register('aboutBusiness')}
            error={errors?.aboutBusiness?.message}
            placeholder="Tell more about your company or business"
          />
        </Label>
      </div>

      <div>
        <p className={style.main_info_title}>Contacts</p>
        <div className={style.phone_number}>
          {/* todo заменить на PhoneInput */}
          {/* <Label label="Business phone number">
                <Select {...register('code')} name="code" options={PHONE_DATA} />
              </Label>
              <Input
                placeholder="(XXX) XXX - XX - XX"
                {...register('tel')}
                error={errors?.tel?.message}
              /> */}
        </div>

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

      <Button type="submit" className={style.button} label="Save" disabled={!isValid} />
    </form>
  );
};
