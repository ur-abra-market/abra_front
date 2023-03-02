import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { PlusIcon } from '../../../assets/img';
import { useAppDispatch } from '../../../store/hooks';
import { setAccountInfo } from '../../../store/reducers/formRegistrationSlice';
import FormTitle from '../../FormTitle';
import Modal from '../../new-components/Modal';
import { Input, Label, Select, Button } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';

import style from './AccountSetupForm.module.css';

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
  license: string;
  country: string;
  tel: string;
  code: string;
}

const AccountSetupForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<IAccountInfoData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: any): void => {
    const phone = data.code + data.tel;

    dispatch(
      setAccountInfo({
        user_info: {
          first_name: data.fname,
          last_name: data.lname,
          phone,
        },
        license: {
          license_number: +data.license,
        },
        country: {
          country: data.country,
        },
      }),
    );

    navigate('/business-profile', { replace: true });

    reset();
  };

  const phone = watch('tel');

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <FormTitle
          step="Step 1/3"
          title="Account Info"
          text="This information will not be published. The data will only be used to create your account"
        />

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
              <Select
                placeholder="Select"
                className={style.select}
                options={PHONE_DATA}
                {...register('code')}
              />
            </Label>
            <Input
              placeholder="(XXX) XXX - XX - XX"
              {...register('tel')}
              error={errors?.tel?.message}
            />
          </div>
          <Label label="License or entrepreneur number">
            <Input
              {...register('license')}
              error={errors?.license?.message}
              placeholder="000 – 00 – 0000"
            />
          </Label>
          <p className={style.license_reminder}>
            Use the number of any document authorizing the sale
          </p>
          <Button
            type="button"
            disabled={!isValid}
            onClick={() => setActive(true)}
            className={style.button}
            label="Continue"
          />
          <Modal active={active} close={setActive} classNameModal={style.modal}>
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
        </form>
      </div>
    </div>
  );
};

export default AccountSetupForm;
