import React, { FC, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';

import { RequestAccountInfo } from '../../../services/supplierAccount.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { accountInfoService } from '../../../store/reducers/formRegistrationSlice';
import { uploadUserLogoService } from '../../../store/reducers/userSlice';
import { filterEmptyValues } from '../../../utils/filterEmptyValues';
import FormTitle from '../../FormTitle';
import ImageAdding from '../../ImageAdding';
import { ImagesAdding } from '../../ImageAdding/ImagesAdding';
import { Button, Input, Label, Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';
import { PHONE_DATA } from '../AccountSetupForm/AccountSetupForm';

import style from './BusinessProfileForm.module.css';

const date = new Date();
const year = date.getFullYear();

const schema = yup.object({
  storeName: yup.string().required('Field is required'),
  businessSector: yup.string().required('Field is required'),
  tel: yup.string().required('Field is required'),
  yearEstablished: yup
    .string()
    .min(4, 'Add an existing year')
    .max(year, "this year hasn't come yet"),
  email: yup.string().email('Invalid email address'),
});

interface FormFields {
  email: string;
  code: string;
  textarea: string;
  tel: string;
  yearEstablished: string;
  address: string;
  checkbox: boolean;
  numEmployees: string;
  profileLogo: string;
  storeName: string;
  businessSector: string;
}

export const NUMBER_OF_EMPLOYEES_DATA: IOption[] = [
  { label: '0', value: '0' },
  { label: '<4', value: '<4' },
  { label: '<10', value: '<10' },
  { label: '>10', value: '>10' },
];

const BUSINESS_SECTOR_DATA: IOption[] = [
  { label: 'Clothes', value: 'Clothes' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Electronics', value: 'Electronics' },
];

const BusinessProfileForm: FC = (): JSX.Element => {
  const [imgUrl, setImgUrl] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resMessage, accountInfo } = useAppSelector(state => state.formRegistration);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormFields>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data: any): void => {
    const phone = data.code + data.tel;

    const info = {
      name: data.storeName,
      business_sector: data.businessSector,
      year_established: +data.yearEstablished,
      number_of_employees: +data.numEmployees,
      description: data.textarea,
      /* logo_url: 'string', */
      phone,
      business_email: data.email,
      address: data.address,
    };

    const accountInfoForRequest = filterEmptyValues(info);

    dispatch(uploadUserLogoService(images[0]));

    dispatch(
      accountInfoService({
        path: 'send_account_info',
        rest: {
          ...accountInfo,
          company_info: {
            ...accountInfoForRequest,
            is_manufacturer: data.checkbox ? 1 : 0,
          },
        } as RequestAccountInfo,
      }),
    );

    reset();
  };

  useEffect(() => {
    if (resMessage === 'DATA_HAS_BEEN_SENT')
      navigate('../add-product', { replace: true });
  }, [resMessage, navigate]);

  if (!accountInfo) return <Navigate to="/account-setup" />;

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <FormTitle
          step="Step 2/3"
          title="Business profile"
          text="Enter the information you want to show on your store profile"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.mainInfo}>
            <p className={style.main_info_title}>Main info</p>

            <ImageAdding
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              images={images}
              setImages={setImages}
              label="Add logo or profile image"
              placeholder="The customers will recognize your store by this image"
              {...register('profileLogo')}
            />

            <div className={style.select_info_inputs}>
              <Label label="Shop name (will be shown on the profile)">
                <Input
                  {...register('storeName')}
                  error={errors?.storeName?.message}
                  placeholder="Enter your company or store name"
                />
              </Label>

              <div className={style.select_equal}>
                <Label label="Your main business sector">
                  <Select
                    options={BUSINESS_SECTOR_DATA}
                    placeholder="Select"
                    {...register('businessSector')}
                    error={errors?.businessSector?.message}
                  />
                </Label>
              </div>
            </div>

            <div className={style.checkbox_container}>
              <input
                type="checkbox"
                id="checkbox"
                className={style.checkbox}
                {...register('checkbox')}
              />
              <label htmlFor="checkbox">I am a manufacturer</label>
            </div>
          </div>

          <div className={style.companyInfo}>
            <p className={style.main_info_title}>Company Info (optional)</p>
            <div className={style.select_info_inputs}>
              <Label label="Year established">
                <Input
                  {...register('yearEstablished')}
                  error={errors?.yearEstablished?.message}
                  placeholder="Enter the year"
                />
              </Label>

              <div className={style.select_equal}>
                <Label label="Number of employees">
                  <Select
                    options={NUMBER_OF_EMPLOYEES_DATA}
                    placeholder="Select"
                    {...register('numEmployees')}
                    error={errors?.numEmployees?.message}
                  />
                </Label>
              </div>
            </div>

            <Label label="About the business">
              <Input
                {...register('textarea')}
                placeholder="Tell more about your company or business"
              />
            </Label>

            <p className={style.list_img_title}>Photo of the company or production</p>
            <div className={style.list_img}>
              {[...new Array(5)].map((el, i) => (
                <ImagesAdding key={i} images={images} setImages={setImages} />
              ))}
            </div>
          </div>

          <div>
            <p className={style.main_info_title}>Contacts (optional)</p>

            <div className={style.phone_number}>
              <Label label="Business phone number">
                <Select {...register('code')} name="code" options={PHONE_DATA} />
              </Label>
              <Input
                placeholder="(XXX) XXX - XX - XX"
                {...register('tel')}
                error={errors?.tel?.message}
              />
            </div>

            <div className={style.contacts_inputs}>
              <Label label="Business email address">
                <Input
                  {...register('email')}
                  error={errors?.email?.message}
                  placeholder="business@email.com"
                />
              </Label>

              <Label label="Main company address">
                <Input {...register('address')} placeholder="Enter address" />
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            label="Continue"
            disabled={!isValid}
            className={style.button}
          />
        </form>
      </div>
    </div>
  );
};

export default BusinessProfileForm;
