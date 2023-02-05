import React, { useRef, useEffect, useState, ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import deleteImg from '../../assets/img/icons/delete_Img_red.svg';
import AddingImageSpot from '../../components/AddingImage/AddingImageSpot/AddingImageSpot';
import { InfoBtn } from '../../components/buttons';
import Checkbox from '../../components/Checkbox';
import ImmutableTextFieldWithChangeButton from '../../components/ImmutableTextFieldWithChangeButton/ImmutableTextFieldWithChangeButton';
import Loader from '../../components/Loader';
import PhoneNumFieldWithoutCountryCode from '../../components/PhoneNumFieldWithoutCountryCode';
import SelectLabelAbove from '../../components/SelectLabelAbove';
import TextField from '../../components/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSupplierAccountDataService,
  getSupplierNotifications,
  postSupplierNotifications,
  postSupplierAccountDataService,
} from '../../store/reducers/supplierAccountSlice';
import { countryPrefix, numberWithoutPrefix } from '../../utils/phoneNumberSeparator';

import {
  textFieldClasses,
  accountDetails__textFieldClasses,
  notificationCheckboxClasses,
  checkboxClasses,
  classesOfCompanyImages,
  classesOfLogoImage,
  inputPhoneClasses,
} from './constantsOfClassesStyles';
import style from './SupplierAccountMainPage.module.css';

const defaultValue = {
  user_info: {
    first_name: '',
    last_name: '',
    code: '+7',
    phone: '',
  },
  license: {
    license_number: 0,
  },
  country: {
    country: '',
  },
  company_info: {
    logo_url: '',
    name: '',
    business_sector: '',
    year_established: '',
    number_of_employees: '',
    description: '',
    code: '+7',
    phone: '',
    business_email: '',
    address: '',
    is_manufacturer: 0,
  },
  notifications: {
    on_discount: false,
    on_order_updates: false,
    on_order_reminders: false,
    on_stock_again: false,
    on_product_is_cheaper: false,
    on_your_favorites_new: false,
    on_account_support: false,
  },
};
const SupplierAccountMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyPhotoPicker = useRef(null);

  const { isLoading, supplierInfo, notifications } = useAppSelector(
    state => state.supplierAccount,
  );
  const [images, setImages] = useState([]);
  const [selectedCompanyPhoto, setSelectedCompanyPhoto] = useState(null);

  console.log('DATA', supplierInfo);
  console.log('notifications', notifications);

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: defaultValue,
  });

  const handleChange = (event: any): void => {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) setSelectedCompanyPhoto(event.target.files[0]);
  };

  const renderPhoto = (photo: any): JSX.Element => {
    return (
      <>
        <img
          style={{
            width: '95px',
            height: '95px',
            borderRadius: '10px',
          }}
          src={`${photo}`}
          alt="img"
        />
        <button type="button" className={style.photoRemove}>
          <img src={deleteImg} alt="close" />
        </button>
      </>
    );
  };

  const onSubmitInfo = (updatedData: any): void => {
    console.log('updatedData', updatedData);
    // const formData = new FormData();

    // formData.append('company_info.photo_url', selectedCompanyPhoto);
    // console.log('selectedCompanyPhoto', selectedCompanyPhoto);

    // const personalDataForDispatch = {
    //   user_info: {
    //     first_name: updatedData.firstName,
    //     last_name: updatedData.lastName,
    //     phone: updatedData.code + updatedData.phone,
    //   },
    //   license: {
    //     license_number: updatedData.license,
    //   },
    //   company_info: {
    //     logo_url: 'https://mySite.ru',
    //     name: updatedData.shopName,
    //     business_sector: updatedData.businessSector,
    //     is_manufacturer: updatedData.is_manufacturer === true ? 1 : 0,
    //     year_established: +updatedData.yearEstablished,
    //     number_of_employees: 12, // updatedData.numberOfEmployees,
    //     description: updatedData.aboutBusiness,
    //     phone: updatedData.businessPhoneCode + updatedData.businessPhone,
    //     business_email: updatedData.businessEmail,
    //     address: updatedData.businessAdress,
    //   },
    //   country: {
    //     country: updatedData.country,
    //   },
    // };
    // const notifications = {
    //   on_discount: updatedData.discountsOffers,
    //   on_order_updates: updatedData.orderUpdates,
    //   on_order_reminders: updatedData.orderReminders,
    //   on_stock_again: updatedData.onStockAgain,
    //   on_product_is_cheaper: updatedData.productIsCheaper,
    //   on_your_favorites_new: updatedData.yourFavoritesNew,
    //   on_account_support: updatedData.accountSupport,
    // };
    //
    // console.log(' dataForDispatch', personalDataForDispatch);
    // console.log(' notificationsForDispatch', notifications);
    // dispatch(postSupplierAccountDataService(personalDataForDispatch));
    // dispatch(postSupplierNotifications(notifications));

    // dispatch(uploadUserLogoService())
    dispatch(postSupplierNotifications(updatedData.notifications));
  };

  useEffect(() => {
    // dispatch(getSupplierAccountDataService());
    dispatch(getSupplierNotifications());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getSupplierAccountDataService());
    reset({ notifications: { ...notifications } });
  }, [notifications, reset]);

  if (isLoading) return <Loader />;

  return (
    <div className={style.supplierCabinet}>
      <form onSubmit={handleSubmit(onSubmitInfo)}>
        <div className={style.supplierCabinet__contentWrapper}>
          <div className={`${style.section} ${style.profileInfo}`}>
            <div className={style.header__wrapper}>
              <div className={style.header}>Profile Info</div>
            </div>
            <div className={style.fieldsWrapper}>
              <div className={style.flexContainer}>
                <TextField
                  inputProps={register('user_info.first_name', {
                    // required: 'First name is required!',
                    minLength: {
                      value: 2,
                      message: 'First name contains less than 2 characters!',
                    },
                  })}
                  error={errors?.user_info?.first_name}
                  label="First name"
                  placeholder="Enter first name"
                  classes={textFieldClasses}
                />
              </div>
              <div className={style.flexContainer}>
                <TextField
                  inputProps={register('user_info.last_name', {
                    required: 'Last name is required!',
                    minLength: {
                      value: 2,
                      message: 'Last name contains less than 2 characters!',
                    },
                  })}
                  error={errors.user_info?.last_name}
                  label="Last name"
                  name="last_name"
                  placeholder="Enter last name"
                  classes={textFieldClasses}
                />
              </div>
            </div>
            <div className={style.wrapper}>
              <SelectLabelAbove
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setValue('country.country', e.target.value)
                }
                error={errors.country?.country?.message}
                title="Country of company registration"
                options={['Turkey', 'Russia', 'USA', 'some other']}
                placeholder="Select"
              />
            </div>
            <div className={style.profileInfo__number}>
              <div>
                <SelectLabelAbove
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setValue('user_info.code', e.target.value)
                  }
                  selectProps={{ defaultValue: '+7' }}
                  error={errors.user_info?.code?.message}
                  title="Personal phone number"
                  options={['+7', '+90', 'other']}
                  placeholder="Select"
                />
              </div>
              <PhoneNumFieldWithoutCountryCode
                placeholder="(XXX) XXX - XX - XX"
                classes={inputPhoneClasses}
                // name="phone"
                inputProps={register('user_info.phone', {
                  required: 'Phone is required!',
                })}
                error={errors.user_info?.phone?.message}
              />
            </div>
            <div className={style.textFieldWrapper}>
              <TextField
                label="License or entrepreneur number"
                placeholder="000 – 00 – 0000"
                classes={textFieldClasses}
                inputProps={register('license.license_number')}
              />
            </div>
          </div>

          <div className={`${style.section} ${style.businessProfile}`}>
            <div className={style.header__wrapper}>
              <div className={style.header}>Business Profile</div>
            </div>
            <div className={style.profileLogo}>
              <AddingImageSpot
                // logo={business_profile?.logo_url}
                images={images}
                setImages={setImages}
                classes={classesOfLogoImage}
                label="Add logo or profile image"
                placeholder="The customers will recognize your store by this image"
                register={register('company_info.logo_url')}
              />
            </div>
            <div className={style.fieldsWrapper}>
              <div className={style.flexContainer}>
                <TextField
                  inputProps={register('company_info.name', {
                    required: 'Shop name is required!',
                  })}
                  error={errors.company_info?.name}
                  label="Shop name (will be shown on the profile)"
                  name="shopName"
                  placeholder="Enter your company or store name"
                  classes={textFieldClasses}
                />
              </div>
              <div className={style.flexContainer}>
                <SelectLabelAbove
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setValue('company_info.business_sector', e.target.value)
                  }
                  error={errors?.company_info?.business_sector?.message}
                  title="Your main business sector"
                  options={['Option1', 'Option2', 'Clothes']}
                  placeholder="Select"
                />
              </div>
            </div>
            <Checkbox
              label="I am a manufacturer"
              classes={checkboxClasses}
              {...register('company_info.is_manufacturer')}
            />
            <div className={style.section_subtitle}>Company Info (optional)</div>
            <div className={style.fieldsWrapper}>
              <div className={style.flexContainer}>
                <TextField
                  inputProps={register('company_info.year_established', {
                    maxLength: {
                      value: 4,
                      message: 'Enter a valid year!',
                    },
                    pattern: {
                      value: /\d+$/g,
                      message: 'Year is incorrect!',
                    },
                  })}
                  error={errors.company_info?.year_established}
                  label="Year established"
                  name="yearEstablished"
                  placeholder="Enter the year"
                  classes={textFieldClasses}
                />
              </div>
              <div className={style.flexContainer}>
                <SelectLabelAbove
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setValue('company_info.number_of_employees', e.target.value)
                  }
                  // defaultValue={
                  //   business_profile.number_of_employees
                  //     ? business_profile.number_of_employees
                  //     : ''
                  // }
                  error={errors?.company_info?.number_of_employees?.message}
                  title="Number of employees"
                  options={['<10', '>10', '>50', '>100']}
                  placeholder="Select"
                />
              </div>
            </div>
            <div className={style.textareaName}>About the business</div>
            <textarea
              className={style.aboutBusiness}
              placeholder="Tell more about your company or business"
              rows={5}
              {...register('company_info.description')}
            />
            <div className={style.textareaName}>Photo of the company or production</div>
            <div className={style.companyPhotoWrapper}>
              {/* {business_profile.url.length */}
              {/*  ? business_profile.url.map((photo, index) => ( */}
              {/*      <div className={style.photo} key={index}> */}
              {/*        {renderPhoto(photo)} */}
              {/*      </div> */}
              {/*    )) */}
              {/*  : [1, 2, 3, 4, 5].map(index => ( */}
              {/*      <AddingImageSpot */}
              {/*        key={`index_${index}`} */}
              {/*        images={images} */}
              {/*        setImages={setImages} */}
              {/*        classes={classesOfCompanyImages} */}
              {/*      /> */}
              {/*    ))} */}
              {/* {business_profile.url.length !== 0 && */}
              {/*  [1, 2, 3, 4, 5] */}
              {/*    .slice(data.business_profile.url.length) */}
              {/*    .map(index => ( */}
              {/*      <AddingImageSpot */}
              {/*        key={`index_${index}`} */}
              {/*        images={images} */}
              {/*        setImages={setImages} */}
              {/*        classes={classesOfCompanyImages} */}
              {/*      /> */}
              {/*    ))} */}

              <input
                className={style.hidden}
                type="file"
                accept="image/*, .png, .jpg, .gif, .web"
                onChange={handleChange}
                ref={companyPhotoPicker}
              />
            </div>

            <div className={style.section_subtitle}>Contacts (optional)</div>
            <div className={style.profileInfo__number}>
              <div className={style.wrapper}>
                <SelectLabelAbove
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setValue('company_info.code', e.target.value)
                  }
                  // defaultValue={countryPrefix(business_profile.phone)}
                  error={errors.company_info?.code?.message}
                  selectProps={{ defaultValue: '+7' }}
                  title="Business phone number"
                  name="businessCode"
                  options={['+7', '+90', 'other']}
                  placeholder="Select"
                />
              </div>
              <PhoneNumFieldWithoutCountryCode
                label=""
                name="businessPhone"
                placeholder="(XXX) XXX - XX - XX"
                classes={inputPhoneClasses}
                // defaultValue={numberWithoutPrefix(business_profile.phone)}
                inputProps={register('company_info.phone')}
                error={errors.company_info?.phone}
              />
            </div>
            <div className={style.textFieldWrapper}>
              <TextField
                inputProps={register('company_info.business_email', {
                  pattern: {
                    value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
                    message: 'Email is incorrect!',
                  },
                })}
                error={errors.company_info?.business_email}
                label="Business email address"
                placeholder="business@email.com"
                classes={textFieldClasses}
                // defaultValue={business_profile.business_email}
              />
            </div>
            <div className={style.textareaName}>Main company address</div>
            <textarea
              className={style.aboutBusiness}
              placeholder="Enter address"
              wrap="hard"
              {...register('company_info.address')}
            />
          </div>

          <div className={`${style.section} ${style.notifications}`}>
            <div className={style.header__wrapper}>
              <div className={style.header}>Notifications</div>
            </div>
            <div className={style.notificationsList}>
              <div className={style.notificationsList__item}>
                <Checkbox
                  // defaultChecked={notifications?.on_discount}
                  label="Discounts & offers"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_discount')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  // defaultChecked={notifications?.on_order_updates}
                  label="Order updates"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_order_updates')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  // defaultChecked={notifications?.on_order_reminders}
                  label="Order reminders"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_order_reminders')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  // defaultChecked={notifications?.on_stock_again}
                  label="On stock again"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_stock_again')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  // defaultChecked={notifications?.on_product_is_cheaper}
                  label="Product is cheaper"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_product_is_cheaper')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  label="Your favorites new"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_your_favorites_new')}
                />
              </div>
              <div className={style.notificationsList__item}>
                <Checkbox
                  label="Account support"
                  classes={notificationCheckboxClasses}
                  inputProps={register('notifications.on_account_support')}
                />
              </div>
            </div>
          </div>

          <div className={`${style.section} ${style.accountDetails}`}>
            <div className={style.header__wrapper}>
              <div className={style.header}>Account Details</div>
            </div>
            <div className={style.accountDetails__wrapper}>
              <div className={style.flexContainer}>
                <ImmutableTextFieldWithChangeButton
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  classes={accountDetails__textFieldClasses}
                />
              </div>
              <div className={style.flexContainer}>
                <ImmutableTextFieldWithChangeButton
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your email password"
                  classes={accountDetails__textFieldClasses}
                  defaultValue="значение"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          // onClick={(i) => onSubmit(i)}
          className={style.saveChangesBtnWrapper}
        >
          <button type="submit" className={style.saveChangesBtn}>
            Save changes
          </button>
        </div>
      </form>

      <div className={style.removeWrapper}>
        <Link className={style.removeAccauntLink} to="/">
          Remove the account?
        </Link>
        <div className={style.linkDescription}>
          (All your data including order history will be deleted)
        </div>
        <InfoBtn />
      </div>
    </div>
  );
};

export default SupplierAccountMainPage;
