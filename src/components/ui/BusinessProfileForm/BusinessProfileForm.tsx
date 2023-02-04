import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { accountInfoService } from '../../../store/reducers/formRegistrationSlice';
import { uploadUserLogoService } from '../../../store/reducers/userSlice';
import { filterEmptyValues } from '../../../utils/filterEmptyValues';
import ButtonReg from '../../buttons/ButtonReg/ButtonReg';
import Form from '../../Form';
import FormTitle from '../../FormTitle';
import ImageAdding from '../../ImageAdding';
import SelectLabelAbove from '../../SelectLabelAbove';
import TextFieldLabelAbove from '../../TextFieldLabelAbove';

import style from './BusinessProfileForm.module.css';

const BusinessProfileForm = () => {
  const date = new Date();
  const year = date.getFullYear();
  const [imgUrl, setImgUrl] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resMessage, accountInfo } = useSelector(state => state.formRegistration);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    const phone = data.code + data.tel;

    const info = {
      name: data.storeName,
      business_sector: data.businessSector,
      year_established: +data.yearEstablished,
      number_of_employees: +data.numEmployees,
      description: data.textarea,
      // photo_url: ['string'],
      phone,
      business_email: data.email,
      address: data.address,
    };

    // checking for empty fields
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
        },
      }),
    );

    reset();
  };

  useEffect(() => {
    if (resMessage === 'DATA_HAS_BEEN_SENT')
      navigate('../add-product', { replace: true });
  }, [resMessage, navigate]);

  return (
    <div className={style.formWrapper}>
      <div className={style.formContainer}>
        <FormTitle
          step="Step 2/3"
          title="Business profile"
          text="Enter the information you want to show on your store profile"
        />

        <Form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={style.mainInfo}>
            <p className={style.mainInfoTitle}>Main info</p>

            <ImageAdding
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              images={images}
              setImages={setImages}
              label="Add logo or profile image"
              placeholder="The customers will recognize your store by this image"
              register={register('profileLogo')}
            />

            <div className={style.selectInfoInputs}>
              <TextFieldLabelAbove
                register={register('storeName', {
                  required: 'Field is required',
                })}
                error={errors?.storeName?.message}
                title="Shop name (will be shown on the profile)"
                name="storeName"
                type="text"
                placeholder="Enter your company or store name"
              />

              <div className={style.selectEqual}>
                <SelectLabelAbove
                  register={register('businessSector', {
                    required: 'Field is required',
                  })}
                  error={errors?.businessSector?.message}
                  title="Your main business sector"
                  name="businessSector"
                  options={['Clothes', 'Accessories', 'electronics']}
                  placeholder="Select"
                />
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
            <p className={style.mainInfoTitle}>Company Info (optional)</p>

            <div className={style.selectInfoInputs}>
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

              <div className={style.selectEqual}>
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

            <p className={style.listImgTitle}>Photo of the company or production</p>
            <div className={style.listImg}>
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
              <ImageAdding />
            </div>
          </div>

          <div className={style.contactsInfo}>
            <p className={style.mainInfoTitle}>Contacts (optional)</p>

            <div className={style.phoneNumber}>
              <SelectLabelAbove
                register={register('code')}
                name="code"
                title="Business phone number"
                options={['+90', '+44', '+77', '+1']}
              />

              <div className={style.marginFix}>
                <TextFieldLabelAbove
                  register={register('tel', {
                    minLength: {
                      value: 10,
                      message: 'Phone number must be 10 digits',
                    },
                  })}
                  error={errors?.tel?.message}
                  name="tel"
                  type="tel"
                  placeholder="(XXX) XXX - XX - XX"
                />
              </div>
            </div>

            <div className={style.contactsInputs}>
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
        </Form>
      </div>
    </div>
  );
};

export default BusinessProfileForm;
