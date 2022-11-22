import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import iconImage from '../../../assets/img/icons/icon-img.png'
import TextField from '../../common/TextField'
import PhoneNumFieldWithoutCountryCode from '../../common/PhoneNumFieldWithoutCountryCode'
import {
  getSupplierAccountDataService,
  postSupplierAccountDataService
} from '../../../store/reducers/supplierAccountSlice'
import { InfoBtn } from '../../common/buttons'
import Checkbox from '../../common/Checkbox'
// import Select from '../../common/Select'
// import arrowTriangleImg from '../../../assets/img/icons/check-arrow.png'
import deleteImg from '../../../assets/img/icons/delete_Img_red.svg'
import {
  textFieldClasses,
  accountDetails__textFieldClasses,
  notificationCheckboxClasses,
  checkboxClasses,
  // selectCountryClasses,
  // selectPersonalPhoneClasses,
  // selectBusinessPhoneClasses,
  // selectBusinessSectorClasses,
  // selectNumberOfEmployeesClasses,
  inputPhoneClasses
} from './constantsOfClassesStyles'
import Loader from '../../common/Loader'
import ImmutableTextFieldWithChangeButton from '../../common/ImmutableTextFieldWithChangeButton/ImmutableTextFieldWithChangeButton'
import {
  countryPrefix,
  numberWithoutPrefix
} from '../../../utils/phoneNumberSeparator'
import style from './SupplierAccountMainPage.module.css'
import SelectLabelAbove from '../../common/SelectLabelAbove'

const SupplierAccountMainPage = () => {
  const dispatch = useDispatch()
  const companyPhotoPicker = useRef(null)
  const { isLoading, data } = useSelector((state) => state.supplierAccount)
  // console.log('data', data)
  const {
    register,
    formState: { isValid, errors },
    handleSubmit
  } = useForm({ mode: 'onChange' })
  console.log('isValid ', isValid)

  useEffect(() => {
    dispatch(getSupplierAccountDataService())
  }, [])

  const [selectedCompanyPhoto, setSelectedCompanyPhoto] = useState(null) // хранится выбранный файл
  // const [uploaded, setUploaded] = useState() // хранится ответ от сервера с именем файла и путем, где его можно найти

  const handleChange = (event) => {
    console.log(event.target.files)
    setSelectedCompanyPhoto(event.target.files[0])
  }

  const handlePick = () => {
    companyPhotoPicker.current.click()
  }

  const renderPhoto = (photo) => {
    return (
      <>
        <div className={style.photo}>
          <img
            style={{
              width: '95px',
              height: '95px',
              borderRadius: '10px'
            }}
            src={`${photo}`}
            alt="img"
          />
          <button className={style.photoRemove}>
            <img src={deleteImg} alt="close" />
          </button>
        </div>
      </>
    )
  }
  // функция котрая рисует незаполненные окошки для фото компании (всего мест для фото по макету 5)
  const renderSamples = (index) => {
    return (
      <div
        key={'k_' + index}
        onClick={handlePick}
        className={style.companyPhoto_backgroung}
      >
        <img className={style.companyPhoto_img} src={iconImage} alt="img" />
      </div>
    )
  }

  const onSubmitInfo = (updatedData) => {
    console.log('updatedData', updatedData)
    const formData = new FormData()
    formData.append('company_info.photo_url', selectedCompanyPhoto)
    console.log('selectedCompanyPhoto', selectedCompanyPhoto)

    const dataForDispatch = {
      user_info: {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        phone: updatedData.code + updatedData.phone
      },
      license: {
        license_number: updatedData.license
      },
      company_info: {
        logo_url: 'string',
        name: updatedData.shopName,
        business_sector: updatedData.businessSector,
        is_manufacturer: updatedData.is_manufacturer === true ? 1 : 0,
        year_established: updatedData.yearEstablished,
        number_of_employees: updatedData.numberOfEmployees,
        description: updatedData.aboutBusiness,
        photo_url: formData,
        phone: updatedData.businessPhoneCode + updatedData.businessPhone,
        business_email: updatedData.businessEmail,
        address: updatedData.businessAdress
      },
      country: {
        country: updatedData.country
      }
    }
    console.log(' dataForDispatch', dataForDispatch)
    dispatch(postSupplierAccountDataService(dataForDispatch))
  }

  if (isLoading) return <Loader />

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
                          message: 'First name contains less than 2 characters!'
                        }
                      })}
                      error={errors.firstName}
                      label="First name"
                      name="firstName"
                      placeholder="Enter first name"
                      classes={textFieldClasses}
                      defaultValue={data.personal_info.first_name}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('lastName', {
                        required: 'First name is required!',
                        minLength: {
                          value: 2,
                          message: 'Last name contains less than 2 characters!'
                        }
                      })}
                      error={errors.lastName}
                      label="Last name"
                      name="lastName"
                      placeholder="Enter last name"
                      classes={textFieldClasses}
                      defaultValue={data.personal_info.last_name}
                    />
                  </div>
                </div>
                <div className={style.wrapper}>
                  <SelectLabelAbove
                    register={register('country', {
                      required: 'Field is required'
                    })}
                    defaultValue={data.personal_info.country}
                    error={errors?.country?.message}
                    title={'Country of company registration'}
                    name={'country'}
                    options={['Turkey', 'Russia', 'USA', 'some other']}
                    placeholder={'Select'}
                  />
                </div>
                <div className={style.profileInfo__number}>
                  <div>
                    <SelectLabelAbove
                      register={register('code', {
                        required: 'Field is required'
                      })}
                      defaultValue={countryPrefix(data.personal_info.phone)}
                      error={errors.code}
                      title={'Personal phone number'}
                      name={'code'}
                      options={['+7', '+90', 'other']}
                      placeholder={'Select'}
                    />
                  </div>
                  <PhoneNumFieldWithoutCountryCode
                    name="phone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(data.personal_info.phone)}
                    register={register('phone', {
                      required: 'Phone is required!'
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
                    defaultValue={data.personal_info.license_number.toString()}
                    register={register('license')}
                  />
                </div>
              </div>

              <div className={`${style.section} ${style.businessProfile}`}>
                <div className={style.header__wrapper}>
                  <div className={style.header}>Business Profile</div>
                </div>
                <div className={style.profileLogo}>
                  {data.business_profile.logo_url ? (
                    <img
                      alt="logo"
                      src={data.business_profile.logo_url}
                      width={'80px'}
                      height={'80px'}
                      borderradius={'50%'}
                    />
                  ) : (
                    <div className={style.profileLogo_backgroung}>
                      <img
                        className={style.profileLogo_img}
                        src={iconImage}
                        alt="logo"
                      />
                    </div>
                  )}
                  <div className={style.profileLogo_description}>
                    <div className={style.profileLogo_descriptionTitle}>
                      Add logo or profile image
                    </div>
                    <div className={style.profileLogo_descriptionSubtitle}>
                      The customers will recognize your
                    </div>
                    <div className={style.profileLogo_descriptionSubtitle}>
                      store by this image
                    </div>
                  </div>
                </div>
                <div className={style.fieldsWrapper}>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('shopName', {
                        required: 'Shop name is required!'
                      })}
                      error={errors.shopName}
                      label="Shop name (will be shown on the profile)"
                      name="shopName"
                      placeholder="Enter your company or store name"
                      classes={textFieldClasses}
                      defaultValue={data.business_profile.name}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <SelectLabelAbove
                      register={register('businessSector', {
                        required: 'Field is required'
                      })}
                      defaultValue={data.business_profile.business_sector}
                      error={errors?.businessSector?.message}
                      title={'Your main business sector'}
                      name={'businessSector'}
                      options={['Option1', 'Option2', 'Clothes']}
                      placeholder={'Select'}
                    />
                  </div>
                </div>
                <Checkbox
                  label={'I am a manufacturer'}
                  classes={checkboxClasses}
                  defaultChecked={data.business_profile.is_manufacturer}
                  register={register('is_manufacturer')}
                />
                <div className={style.section_subtitle}>
                  Company Info (optional)
                </div>
                <div className={style.fieldsWrapper}>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('yearEstablished', {
                        maxLength: {
                          value: 4,
                          message: 'Enter a valid year!'
                        },
                        pattern: {
                          value: /\d+$/g,
                          message: 'Year is incorrect!'
                        }
                      })}
                      error={errors.yearEstablished}
                      label="Year established"
                      name="yearEstablished"
                      placeholder="Enter the year"
                      classes={textFieldClasses}
                      defaultValue={data.business_profile.year_established}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <SelectLabelAbove
                      register={register('numberOfEmployees')}
                      defaultValue={
                        data.business_profile.number_of_employees
                          ? data.business_profile.number_of_employees
                          : ''
                      }
                      error={errors?.numberOfEmployees?.message}
                      title={'Number of employees'}
                      name={'numberOfEmployees'}
                      options={['<10', '>10', '>50', '>100']}
                      placeholder={'Select'}
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
                  defaultValue={data.business_profile.description}
                  {...register('aboutBusiness')}
                />
                <div className={style.textareaName}>
                  Photo of the company or production
                </div>
                <div className={style.companyPhotoWrapper}>
                  {data.business_profile.url.length
                    ? data.business_profile.url.map((photo, index) =>
                        renderPhoto(photo, index)
                      )
                    : [1, 2, 3, 4, 5].map((index) => renderSamples(index))}
                  {data.business_profile.url.length !== 0 &&
                    [1, 2, 3, 4, 5]
                      .slice(data.business_profile.url.length)
                      .map((index) => renderSamples(index))}

                  <input
                    className={style.hidden}
                    type="file"
                    accept="image/*, .png, .jpg, .gif, .web"
                    onChange={handleChange}
                    ref={companyPhotoPicker}
                  />
                </div>

                <div className={style.section_subtitle}>
                  Contacts (optional)
                </div>
                <div className={style.profileInfo__number}>
                  <div className={style.wrapper}>
                    <SelectLabelAbove
                      register={register('businessPhoneCode')}
                      defaultValue={countryPrefix(data.business_profile.phone)}
                      error={errors.businessCode}
                      title={'Business phone number'}
                      name={'businessCode'}
                      options={['+7', '+90', 'other']}
                      placeholder={'Select'}
                    />
                  </div>
                  <PhoneNumFieldWithoutCountryCode
                    label=""
                    name="businessPhone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(
                      data.business_profile.phone
                    )}
                    register={register('businessPhone')}
                    error={errors.businessPhone}
                  />
                </div>
                <div className={style.textFieldWrapper}>
                  <TextField
                    register={register('businessEmail', {
                      pattern: {
                        value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
                        message: 'Email is incorrect!'
                      }
                    })}
                    error={errors.businessEmail}
                    label="Business email address"
                    name="businessEmail"
                    placeholder="business@email.com"
                    classes={textFieldClasses}
                    defaultValue={data.business_profile.business_email}
                  />
                </div>
                <div className={style.textareaName}>Main company address</div>
                <textarea
                  className={style.aboutBusiness}
                  placeholder="Enter address"
                  name="businessAdress"
                  wrap="hard"
                  defaultValue={data.business_profile.address}
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
                      label="Discounts & offers"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="Order updates"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="Order reminders"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="On stock again"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="Product is cheaper"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="Your favorites new"
                      classes={notificationCheckboxClasses}
                    />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox
                      label="Account support"
                      classes={notificationCheckboxClasses}
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
                      defaultValue={data.personal_info.email}
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
  )
}

export default SupplierAccountMainPage
