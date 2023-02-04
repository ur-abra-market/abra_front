import React, { useRef, useEffect, useState } from 'react';

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

const SupplierAccountMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyPhotoPicker = useRef(null);
  const { isLoading, personal_info, business_profile } = useAppSelector(
    state => state.supplierAccount,
  );

  console.log('DATA', personal_info, business_profile);
  const { notifications } = useAppSelector(state => state.supplierAccount);

  console.log('notifications', notifications);
  const [images, setImages] = useState([]);
  const [selectedCompanyPhoto, setSelectedCompanyPhoto] = useState(null); // хранится выбранный файл
  // const [uploaded, setUploaded] = useState() // хранится ответ от сервера с именем файла и путем, где его можно найти
  // console.log('data', data)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    dispatch(getSupplierAccountDataService());
    dispatch(getSupplierNotifications());
  }, []);

  const handleChange = event => {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) setSelectedCompanyPhoto(event.target.files[0]);
  };

  const renderPhoto = photo => {
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
    const formData = new FormData();

    formData.append('company_info.photo_url', selectedCompanyPhoto);
    console.log('selectedCompanyPhoto', selectedCompanyPhoto);

    const personalDataForDispatch = {
      user_info: {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        phone: updatedData.code + updatedData.phone,
      },
      license: {
        license_number: updatedData.license,
      },
      company_info: {
        logo_url: 'string',
        name: updatedData.shopName,
        business_sector: updatedData.businessSector,
        is_manufacturer: updatedData.is_manufacturer === true ? 1 : 0,
        year_established: +updatedData.yearEstablished,
        number_of_employees: 12, // updatedData.numberOfEmployees,
        description: updatedData.aboutBusiness,
        // photo_url: formData,
        phone: updatedData.businessPhoneCode + updatedData.businessPhone,
        business_email: updatedData.businessEmail,
        address: updatedData.businessAdress,
      },
      country: {
        country: updatedData.country,
      },
    };
    const notificationsForDispatch = {
      discountsOffers: updatedData.discountsOffers,
      orderUpdates: updatedData.orderUpdates,
      orderReminders: updatedData.orderReminders,
      onStockAgain: updatedData.onStockAgain,
      productIsCheaper: updatedData.productIsCheaper,
      yourFavoritesNew: updatedData.yourFavoritesNew,
      accountSupport: updatedData.accountSupport,
    };

    console.log(' dataForDispatch', personalDataForDispatch);
    console.log(' notificationsForDispatch', notificationsForDispatch);
    dispatch(postSupplierAccountDataService(personalDataForDispatch));
    dispatch(postSupplierNotifications(notificationsForDispatch));

    // dispatch(uploadUserLogoService())
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {data && (
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
                      register={register('firstName', {
                        required: 'First name is required!',
                        minLength: {
                          value: 2,
                          message: 'First name contains less than 2 characters!',
                        },
                      })}
                      error={errors.firstName}
                      label="First name"
                      name="firstName"
                      placeholder="Enter first name"
                      classes={textFieldClasses}
                      defaultValue={personal_info.first_name}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('lastName', {
                        required: 'First name is required!',
                        minLength: {
                          value: 2,
                          message: 'Last name contains less than 2 characters!',
                        },
                      })}
                      error={errors.lastName}
                      label="Last name"
                      name="lastName"
                      placeholder="Enter last name"
                      classes={textFieldClasses}
                      defaultValue={personal_info.last_name}
                    />
                  </div>
                </div>
                <div className={style.wrapper}>
                  <SelectLabelAbove
                    register={register('country', {
                      required: 'Field is required',
                    })}
                    defaultValue={personal_info.country}
                    error={errors?.country?.message}
                    title="Country of company registration"
                    name="country"
                    options={['Turkey', 'Russia', 'USA', 'some other']}
                    placeholder="Select"
                  />
                </div>
                <div className={style.profileInfo__number}>
                  <div>
                    <SelectLabelAbove
                      register={register('code', {
                        required: 'Field is required',
                      })}
                      defaultValue={countryPrefix(personal_info.phone)}
                      error={errors.code}
                      title="Personal phone number"
                      name="code"
                      options={['+7', '+90', 'other']}
                      placeholder="Select"
                    />
                  </div>
                  <PhoneNumFieldWithoutCountryCode
                    name="phone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(personal_info.phone)}
                    register={register('phone', {
                      required: 'Phone is required!',
                    })}
                    error={errors.phone}
                  />
                </div>
                <div className={style.textFieldWrapper}>
                  <TextField
                    label="License or entrepreneur number"
                    name="license"
                    placeholder="000 – 00 – 0000"
                    classes={textFieldClasses}
                    defaultValue={personal_info.license_number.toString()}
                    register={register('license')}
                  />
                </div>
              </div>

              <div className={`${style.section} ${style.businessProfile}`}>
                <div className={style.header__wrapper}>
                  <div className={style.header}>Business Profile</div>
                </div>
                <div className={style.profileLogo}>
                  <AddingImageSpot
                    logo={business_profile?.logo_url}
                    images={images}
                    setImages={setImages}
                    classes={classesOfLogoImage}
                    label="Add logo or profile image"
                    placeholder="The customers will recognize your store by this image"
                    register={register('profileLogo')}
                  />
                </div>
                <div className={style.fieldsWrapper}>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('shopName', {
                        required: 'Shop name is required!',
                      })}
                      error={errors.shopName}
                      label="Shop name (will be shown on the profile)"
                      name="shopName"
                      placeholder="Enter your company or store name"
                      classes={textFieldClasses}
                      defaultValue={business_profile.name}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <SelectLabelAbove
                      register={register('businessSector', {
                        required: 'Field is required',
                      })}
                      defaultValue={business_profile.business_sector}
                      error={errors?.businessSector?.message}
                      title="Your main business sector"
                      name="businessSector"
                      options={['Option1', 'Option2', 'Clothes']}
                      placeholder="Select"
                    />
                  </div>
                </div>
                <Checkbox
                  label="I am a manufacturer"
                  classes={checkboxClasses}
                  defaultChecked={business_profile.is_manufacturer}
                  register={register('is_manufacturer')}
                />
                <div className={style.section_subtitle}>Company Info (optional)</div>
                <div className={style.fieldsWrapper}>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('yearEstablished', {
                        maxLength: {
                          value: 4,
                          message: 'Enter a valid year!',
                        },
                        pattern: {
                          value: /\d+$/g,
                          message: 'Year is incorrect!',
                        },
                      })}
                      error={errors.yearEstablished}
                      label="Year established"
                      name="yearEstablished"
                      placeholder="Enter the year"
                      classes={textFieldClasses}
                      defaultValue={business_profile.year_established}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <SelectLabelAbove
                      register={register('numberOfEmployees')}
                      defaultValue={
                        business_profile.number_of_employees
                          ? business_profile.number_of_employees
                          : ''
                      }
                      error={errors?.numberOfEmployees?.message}
                      title="Number of employees"
                      name="numberOfEmployees"
                      options={['<10', '>10', '>50', '>100']}
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div className={style.textareaName}>About the business</div>
                <textarea
                  className={style.aboutBusiness}
                  placeholder="Tell more about your company or business"
                  name="aboutBusiness"
                  // wrap="hard"
                  rows="5"
                  defaultValue={business_profile.description}
                  {...register('aboutBusiness')}
                />
                <div className={style.textareaName}>
                  Photo of the company or production
                </div>
                <div className={style.companyPhotoWrapper}>
                  {business_profile.url.length
                    ? business_profile.url.map((photo, index) => (
                        <div className={style.photo} key={index}>
                          {renderPhoto(photo)}
                        </div>
                      ))
                    : [1, 2, 3, 4, 5].map(index => (
                        <AddingImageSpot
                          key={`index_${index}`}
                          images={images}
                          setImages={setImages}
                          classes={classesOfCompanyImages}
                        />
                      ))}
                  {business_profile.url.length !== 0 &&
                    [1, 2, 3, 4, 5]
                      .slice(data.business_profile.url.length)
                      .map(index => (
                        <AddingImageSpot
                          key={`index_${index}`}
                          images={images}
                          setImages={setImages}
                          classes={classesOfCompanyImages}
                        />
                      ))}

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
                      register={register('businessPhoneCode')}
                      defaultValue={countryPrefix(business_profile.phone)}
                      error={errors.businessCode}
                      title="Business phone number"
                      name="businessCode"
                      options={['+7', '+90', 'other']}
                      placeholder="Select"
                    />
                  </div>
                  <PhoneNumFieldWithoutCountryCode
                    label=""
                    name="businessPhone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(business_profile.phone)}
                    register={register('businessPhone')}
                    error={errors.businessPhone}
                  />
                </div>
                <div className={style.textFieldWrapper}>
                  <TextField
                    register={register('businessEmail', {
                      pattern: {
                        value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
                        message: 'Email is incorrect!',
                      },
                    })}
                    error={errors.businessEmail}
                    label="Business email address"
                    name="businessEmail"
                    placeholder="business@email.com"
                    classes={textFieldClasses}
                    defaultValue={business_profile.business_email}
                  />
                </div>
                <div className={style.textareaName}>Main company address</div>
                <textarea
                  className={style.aboutBusiness}
                  placeholder="Enter address"
                  name="businessAdress"
                  wrap="hard"
                  defaultValue={business_profile.address}
                  {...register('businessAdress')}
                />
              </div>

              <div className={`${style.section} ${style.notifications}`}>
                <div className={style.header__wrapper}>
                  <div className={style.header}>Notifications</div>
                </div>
                <div className={style.notificationsList}>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_discount}
                      label="Discounts & offers"
                      classes={notificationCheckboxClasses}
                      register={register('discountsOffers')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_order_updates}
                      label="Order updates"
                      classes={notificationCheckboxClasses}
                      register={register('orderUpdates')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_order_reminders}
                      label="Order reminders"
                      classes={notificationCheckboxClasses}
                      register={register('orderReminders')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_stock_again}
                      label="On stock again"
                      classes={notificationCheckboxClasses}
                      register={register('onStockAgain')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_product_is_cheaper}
                      label="Product is cheaper"
                      classes={notificationCheckboxClasses}
                      register={register('productIsCheaper')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_your_favorites_new}
                      label="Your favorites new"
                      classes={notificationCheckboxClasses}
                      register={register('yourFavoritesNew')}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      defaultChecked={notifications?.on_account_support}
                      label="Account support"
                      classes={notificationCheckboxClasses}
                      register={register('accountSupport')}
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
                      defaultValue={personal_info.email}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <ImmutableTextFieldWithChangeButton
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your email password"
                      classes={accountDetails__textFieldClasses}
                      // согласно макету, это значение мы не можем увидеть, его нет и в приходящем респонсе. его можно только поменять при нажатии на кнопку(будет модальное окно для замены), потому поставила загрушку для defaultValue пока
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
              <button className={style.saveChangesBtn}>Save changes</button>
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
      )}
    </>
  );
};

export default SupplierAccountMainPage;
