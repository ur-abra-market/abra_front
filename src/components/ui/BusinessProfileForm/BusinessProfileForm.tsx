import React, { FC, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { RequestAccountInfo } from '../../../services/supplierAccount.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { accountInfoService } from '../../../store/reducers/formRegistrationSlice';
import { uploadUserLogoService } from '../../../store/reducers/userSlice';
import { filterEmptyValues } from '../../../utils/filterEmptyValues';
import ButtonReg from '../../buttons/ButtonReg/ButtonReg';
import FormTitle from '../../FormTitle';
import ImageAdding from '../../ImageAdding';
import SelectLabelAbove from '../../SelectLabelAbove';
import TextFieldLabelAbove from '../../TextFieldLabelAbove';
import { Input, Label, Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';
import { PHONE_DATA } from '../AccountSetupForm/AccountSetupForm';

import style from './BusinessProfileForm.module.css';

interface FormFields {
  email: string;
  code: string;
  textarea: string;
  tel: string;
  yearEstablished: string;
  phone: string;
  address: string;
  checkbox: boolean;
  numEmployees: string;
  profileLogo: string;
  storeName: string;
  businessSector: string;
}

const BUSINESS_SECTOR_DATA: IOption[] = [
  { label: 'Clothes', value: 'Clothes' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Electronics', value: 'Electronics' },
];

const BusinessProfileForm: FC = (): JSX.Element => {
  const date = new Date();
  const year = date.getFullYear();
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
  } = useForm<FormFields>({ mode: 'onChange' });

  const onSubmit = (data: any): void => {
    const phone = data.code + data.tel;

    const info = {
      name: data.storeName,
      business_sector: data.businessSector,
      year_established: +data.yearEstablished,
      number_of_employees: +data.numEmployees,
      description: data.textarea,
      logo_url: 'string',
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
              register={register('profileLogo')}
            />

            <div className={style.select_info_inputs}>
              <Label label="Shop name (will be shown on the profile)">
                <Input
                  {...register('storeName', {
                    required: 'Field is required',
                  })}
                  error={errors?.storeName?.message}
                  placeholder="Enter your company or store name"
                />
              </Label>

              <div className={style.select_equal}>
                <Label label="Your main business sector">
                  <Select
                    options={BUSINESS_SECTOR_DATA}
                    placeholder="Select"
                    {...register('businessSector', {
                      required: 'Field is required',
                    })}
                    error={errors?.businessSector?.message}
                  />
                </Label>
              </div>
            </div>

            <div className={style.checkboxContainer}>
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
              <TextFieldLabelAbove
                register={register('yearEstablished', {
                  minLength: {
                    value: 4,
                    message: 'Add an existing year',
                  },
                  max: {
                    value: year,
                    message: `this year hasn't come yet`,
                  },
                })}
                error={errors?.yearEstablished?.message}
                title="Year Established"
                name="yearEstablished"
                type="number"
                placeholder="Enter the year"
              />

              <div className={style.select_equal}>
                <SelectLabelAbove
                  register={register('numEmployees')}
                  title="Number of employees"
                  name="numEmployees"
                  options={['0', '<4', '<10', '>10']}
                  placeholder="Select"
                />
              </div>
            </div>

            <TextFieldLabelAbove
              register={register('textarea')}
              title="About the business"
              name="textarea"
              placeholder="Tell more about your company or business"
            />

            <p className={style.list_img_title}>Photo of the company or production</p>
            <div className={style.list_img}>
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
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
              <TextFieldLabelAbove
                register={register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors?.email?.message}
                title="Business email address"
                name="email"
                type="email"
                placeholder="business@email.com"
              />

              <TextFieldLabelAbove
                register={register('address')}
                title="Main company address"
                name="address"
                placeholder="Enter address"
              />
            </div>
          </div>

          <ButtonReg type="submit" value="Continue" isValid={!isValid} />
        </form>
      </div>
    </div>
  );
};

export default BusinessProfileForm;
