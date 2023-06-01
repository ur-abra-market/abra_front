import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import ImageAdding from '../../../old-components/ImageAdding/ImageAdding';
import { ImagesAdding } from '../../../old-components/ImageAdding/ImagesAdding';
import { uploadUserLogoService } from '../../../store/reducers/userSlice';
import {
  Button,
  Checkbox,
  Input,
  ISelectOption,
  Label,
  Select,
  SupplierRegisterFormStep,
} from '../../../ui-kit';

import style from './SupplierBusinessProfileForm.module.scss';

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

const phoneNumberSplit = (phone: string): [code: string, tel: string] => {
  const reg = /(\+(?:90|44|77|1))(\d+)/;
  const reg_exec = reg.exec(phone) || '';

  return reg_exec.length > 2 ? [reg_exec[1], reg_exec[2]] : ['', ''];
};

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

export const NUMBER_OF_EMPLOYEES_DATA: ISelectOption[] = [
  { label: '0', value: '0' },
  { label: '<4', value: '<4' },
  { label: '<10', value: '<10' },
  { label: '>10', value: '>10' },
];

const BUSINESS_SECTOR_DATA: ISelectOption[] = [
  { label: 'Clothes', value: 'Clothes' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Electronics', value: 'Electronics' },
];

interface IBusinessProfileForm {
  updateForm?: boolean;
}

export const SupplierBusinessProfileForm: FC<IBusinessProfileForm> = ({
  updateForm,
}): JSX.Element => {
  const [imgUrl, setImgUrl] = useState('');
  const [images, setImages] = useState([]);
  const formContainerClasses = style.form_container;
  const selectCompanyClasses = style.select_company;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resMessage } = useAppSelector(state => state.formRegistration);
  const accountInfo = useAppSelector(state => state.supplierAccount.supplierInfo);

  // @ts-ignore
  const companyInfo = accountInfo?.company_info || {};

  const [acc_code, acc_tel] = phoneNumberSplit(companyInfo.phone);

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: companyInfo?.business_email,
      code: acc_code || undefined,
      textarea: companyInfo.description,
      tel: acc_tel,
      yearEstablished: `${companyInfo.year_established}`,
      address: companyInfo.address,
      checkbox: companyInfo.is_manufacturer === 1,
      // eslint-disable-next-line no-unsafe-optional-chaining
      numEmployees: `${companyInfo?.number_of_employees}` || undefined,
      profileLogo: '',
      storeName: companyInfo.name,
      businessSector: companyInfo.business_sector || undefined,
    },
  });

  const onSubmit = (data: any): void => {
    console.log(data);
    // const phone = data.code + data.tel;

    // const info = {
    //   name: data.storeName,
    //   business_sector: data.businessSector,
    //   year_established: +data.yearEstablished,
    //   number_of_employees: +data.numEmployees,
    //   description: data.textarea,
    //   phone,
    //   business_email: data.email,
    //   address: data.address,
    //   is_manufacturer: data.checkbox ? 1 : 0,
    // };

    // const accountInfoForRequest = filterEmptyValues(info);

    dispatch(uploadUserLogoService(images[0]));

    // dispatch(
    //   updateSupplierAccountDataService({
    //     ...accountInfo,
    //     license: {
    //       // @ts-ignore
    //       license_number: accountInfo?.user_info.license,
    //     },
    //     company_info: {
    //       ...accountInfoForRequest,
    //     },
    //   }),
    // );

    reset();
  };

  useEffect(() => {
    if (resMessage === 'DATA_HAS_BEEN_SENT')
      navigate('../add-product', { replace: true });
  }, [resMessage, navigate]);

  return (
    <div className={style.form_wrapper}>
      <div
        className={cn(formContainerClasses, {
          [style.form_update_container]: updateForm,
        })}
      >
        {!updateForm && (
          <div className={style.info_step}>
            <SupplierRegisterFormStep step={2} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.mainInfo}>
            <p className={style.main_info_title}>
              {updateForm ? 'Business Profile' : 'Main info'}
            </p>

            <div className={style.image_adding}>
              <ImageAdding
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                images={images}
                setImages={setImages}
                label="Add logo or profile image"
                placeholder="The customers will recognize your store by this image"
                {...register('profileLogo')}
              />
            </div>

            <div className={style.select_info_inputs}>
              <Label label="Shop name (will be shown on the profile)">
                <Input
                  {...register('storeName')}
                  error={errors?.storeName?.message}
                  placeholder="Enter your company or store name"
                />
              </Label>

              <div className={style.select_width}>
                <Controller
                  control={control}
                  name="businessSector"
                  render={({ field }) => (
                    <Label label="Your main business sector">
                      <Select
                        options={BUSINESS_SECTOR_DATA}
                        placeholder="Select"
                        error={errors?.businessSector?.message}
                        onChange={value => {
                          field.onChange(value.value);
                        }}
                      />
                    </Label>
                  )}
                />
              </div>
            </div>

            <div
              className={cn(selectCompanyClasses, {
                [style.select_update_company]: updateForm,
              })}
            >
              <Checkbox className={style.checkbox} label="I am a manufacturer" />
              <Label label="License or entrepreneur number">
                <Input placeholder="000 – 00 – 0000" />
              </Label>
              <p className={style.explanatory_form}>
                Use the number of any document authorizing the sale
              </p>
            </div>
          </div>

          <div className={style.company_info}>
            <p className={style.main_info_title}>Company Info (optional)</p>
            <div className={style.select_info_inputs}>
              <Label label="Year established">
                <Input
                  {...register('yearEstablished')}
                  error={errors?.yearEstablished?.message}
                  placeholder="Enter the year"
                />
              </Label>

              <div className={style.select_width}>
                <Controller
                  control={control}
                  name="numEmployees"
                  render={({ field }) => (
                    <Label label="Number of employees">
                      <Select
                        options={NUMBER_OF_EMPLOYEES_DATA}
                        placeholder="Select"
                        padding="23px"
                        error={errors?.numEmployees?.message}
                        className={style.select}
                        onChange={value => {
                          field.onChange(value.value);
                        }}
                      />
                    </Label>
                  )}
                />
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
            <p className={style.main_info_title}>
              {updateForm ? 'Contacts (optional)' : 'Contacts'}
            </p>

            <div className={style.phone_number}>
              {/* <Label label="Business phone number">
                <Select {...register('code')} name="code" options={PHONE_DATA} />
              </Label>
              <Input
                placeholder="(XXX) XXX - XX - XX"
                {...register('tel')}
                error={errors?.tel?.message}
              /> */}
              {/* todo заменить на PhoneInput */}
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
            className={style.button}
            label="Save"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};
