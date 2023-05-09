import React, { useState, useEffect, FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PlusIcon } from '../../../assets/img';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateSupplierAccountDataService } from '../../../store/reducers/supplierAccountSlice';

import style from './PersonalInfoChangeForm.module.css';

import Modal from 'components/new-components/Modal';
import { Input, Label, Select, Button } from 'components/ui-kit';
import { IOption } from 'components/ui-kit/Select/Select.props';

const COUNTRY_DATA: IOption[] = [
  { label: 'USA', value: 'USA' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'France', value: 'France' },
];

export const PHONE_DATA: IOption[] = [
  { label: '+90', value: '+90' },
  { label: '+44', value: '+44' },
  { label: '+77', value: '+77' },
  { label: '+1', value: '+1' },
];

const phoneNumberSplit = (phone: string): [code: string, tel: string] => {
  const reg = /(\+(?:90|44|77|1))(\d+)/;
  const reg_exec = reg.exec(phone) || '';

  return reg_exec.length > 2 ? [reg_exec[1], reg_exec[2]] : ['', ''];
};

const schema = yup
  .object({
    fname: yup.string().min(2, 'Name should have at least a 2 symbols').required(),
    lname: yup.string().min(2, 'Name should have at least a 2 symbols').required(),
    license: yup.string().min(9, 'Min length is 9').required(),
    country: yup.string().required(),
    code: yup.string().required('Field is required'),
    tel: yup.string().required('Field is required'),
  })
  .required();

interface IAccountInfoData {
  fname: string;
  lname: string;
  license: number;
  country: string;
  tel: string;
  code: string;
}

const PersonalInfoChangeForm: FC = (): JSX.Element => {
  const supplierInfo = useAppSelector(state => state.supplierAccount.supplierInfo) || {};
  // if (accountInfo == undefined)
  //   return <></>;
  const accountInfo = {
    user_info: {
      first_name: '',
      last_name: '',
      phone: '',
    },
    license: {
      license_number: 0,
    },
    country: {
      country: '',
    },
  };

  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const [saveBtnActive, setSaveBtnActive] = useState(false);
  const [acc_code, acc_tel] = phoneNumberSplit(accountInfo.user_info.phone);

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm<IAccountInfoData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      fname: accountInfo.user_info.first_name,
      lname: accountInfo.user_info.last_name,
      license: accountInfo.license.license_number,
      country: accountInfo.country.country || undefined,
      code: acc_code || undefined,
      tel: acc_tel,
    },
  });

  const onSubmit = (data: IAccountInfoData): void => {
    const user_phone = data.code + data.tel;

    dispatch(
      // @ts-ignore
      updateSupplierAccountDataService({
        ...supplierInfo,
        user_info: {
          first_name: data.fname,
          last_name: data.lname,
          user_phone,
        },
        license: {
          license_number: +data.license,
        },
      }),
    );

    setActive(false);
    setSaveBtnActive(false);

    reset();
  };

  useEffect(() => {
    if (isDirty) setSaveBtnActive(true);
  }, [isDirty]);

  const phone = watch('tel');

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <div className={style.form_title}>Personal Info</div>
        <form onSubmit={handleSubmit(onSubmit)} id="test">
          <div className={style.add_name}>
            <Label label="First name">
              <Input
                placeholder="John"
                {...register('fname')}
                error={errors.fname?.message}
              />
            </Label>
            <Label label="Last name">
              <Input
                placeholder="Johnson"
                {...register('lname')}
                error={errors.lname?.message}
              />
            </Label>
          </div>
          <Label label="Country of company registration">
            <Select
              placeholder="Select"
              options={COUNTRY_DATA}
              {...register('country')}
              error={errors?.country?.message}
            />
          </Label>
          <div className={style.phone_number}>
            <Label label="Personal phone number">
              <Select placeholder="Select" options={PHONE_DATA} {...register('code')} />
            </Label>
            <Input
              placeholder="(XXX) XXX - XX - XX"
              {...register('tel')}
              error={errors?.tel?.message}
            />
          </div>
          <Label label="License or entrepreneur number">
            <Input
              placeholder="000 – 00 – 0000"
              {...register('license')}
              error={errors?.license?.message}
            />
          </Label>
          <p className={style.license_reminder}>
            Use the number of any document authorizing the sale
          </p>
          {saveBtnActive ? (
            <Button
              type="button"
              onClick={() => setActive(true)}
              disabled={!isValid}
              className={style.button}
              label="Save"
            />
          ) : null}
          {active && (
            <Modal showModal={active} closeModal={setActive} classNameModal={style.modal}>
              <div className={style.modal_wrapper}>
                <div className={style.modal_header}>Verify your phone number</div>
                <div className={style.modal_container}>
                  <div className={style.modal_content}>
                    <div className={style.modal_title_item}>Your phone number</div>
                    <div className={style.modal_middle_item}>+{phone}</div>
                    <button
                      type="button"
                      className={style.modal_button}
                      onClick={() => setActive(false)}
                    >
                      Change
                    </button>
                  </div>
                  <div className={style.modal_content}>
                    <div className={style.modal_title_item}>Verification code</div>
                    <div className={style.modal_middle_item}>
                      <Input placeholder="SMS Code" />
                    </div>
                    <button type="button" className={style.modal_button}>
                      Resend
                    </button>
                  </div>
                </div>
                <Button type="submit" label="Submit" form="test" />
              </div>
              <button
                type="button"
                className={style.modal_icon_plus}
                onClick={() => setActive(false)}
              >
                <PlusIcon />
              </button>
            </Modal>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoChangeForm;
