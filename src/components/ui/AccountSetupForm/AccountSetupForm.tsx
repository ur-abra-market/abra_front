import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../store/hooks';
import { setAccountInfo } from '../../../store/reducers/formRegistrationSlice';
import FormTitle from '../../FormTitle';
import { Input, Label, Select } from '../../ui-kit';
import { Button } from '../../ui-kit/Button/Button';
import { IOption } from '../../ui-kit/Select/Select.props';

import style from './AccountSetupForm.module.css';

const COUNTRY_DATA: IOption[] = [
  { label: 'USA', value: 'USA' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'France', value: 'France' },
];
const PHONE_DATA: IOption[] = [
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

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <FormTitle
          step="Step 1/3"
          title="Account Info"
          text="This information will not be published. The data will only be used to create your account"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register('license')}
              error={errors?.license?.message}
              placeholder="000 – 00 – 0000"
            />
          </Label>
          <p className={style.license_reminder}>
            Use the number of any document authorizing the sale
          </p>
          <Button
            disabled={!isValid}
            type="submit"
            className={style.button}
            label="Continue"
          />
        </form>
      </div>
    </div>
  );
};

export default AccountSetupForm;
