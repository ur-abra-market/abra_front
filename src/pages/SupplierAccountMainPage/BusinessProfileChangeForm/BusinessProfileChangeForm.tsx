import React, { FC, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';

import { PHONE_DATA } from '../../../components/ui/AccountSetupForm/AccountSetupForm';
import { CompanyInfo } from '../../../services/supplierAccount.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateSupplierAccountDataService } from '../../../store/reducers/supplierAccountSlice';
import { uploadUserLogoService } from '../../../store/reducers/userSlice';
import { filterEmptyValues } from '../../../utils/filterEmptyValues';

import style from './BusinessProfileChangeForm.module.css';

import ImageAdding from 'components/ImageAdding';
import { ImagesAdding } from 'components/ImageAdding/ImagesAdding';
import { Button, Input, Label, Select } from 'components/ui-kit';
import { IOption } from 'components/ui-kit/Select/Select.props';

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

const BusinessProfileChangeForm: FC = (): JSX.Element => {
  const [imgUrl, setImgUrl] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useAppDispatch();
  const [saveBtnActive, setSaveBtnActive] = useState(false);
  const accountInfo = useAppSelector(state => state.supplierAccount.supplierInfo);

  // @ts-ignore
  const companyInfo = accountInfo?.company_info || ({} as CompanyInfo);

  const [acc_code, acc_tel] = phoneNumberSplit(companyInfo.phone);

  const {
    register,
    formState: { errors, isValid, isDirty },
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

  const onSubmit = (data: FormFields): void => {
    const phone = data.code + data.tel;

    const info = {
      name: data.storeName,
      business_sector: data.businessSector,
      year_established: +data.yearEstablished,
      number_of_employees: +data.numEmployees,
      description: data.textarea,
      phone,
      business_email: data.email,
      address: data.address,
      is_manufacturer: data.checkbox ? 1 : 0,
    };

    const accountInfoForRequest = filterEmptyValues(info);

    dispatch(uploadUserLogoService(images[0]));

    dispatch(
      updateSupplierAccountDataService({
        ...accountInfo,
        license: {
          // @ts-ignore
          license_number: accountInfo?.user_info.license,
        },
        company_info: {
          ...accountInfoForRequest,
        },
      }),
    );

    reset();
  };

  useEffect(() => {
    if (isDirty) setSaveBtnActive(true);
  }, [isDirty]);

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.mainInfo}>
            <p className={style.main_info_title}>Business Profile</p>

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
          {saveBtnActive ? (
            <Button
              type="submit"
              label="Save"
              disabled={!isValid}
              className={style.button}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default BusinessProfileChangeForm;
