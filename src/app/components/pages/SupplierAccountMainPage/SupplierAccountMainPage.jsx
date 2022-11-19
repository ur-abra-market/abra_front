import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import iconImage from '../../../assets/img/icons/icon-img.png'
import TextField from '../../common/TextField'
import PhoneNumFieldWithoutCountryCode from '../../common/PhoneNumFieldWithoutCountryCode'
import {
  getSupplierAccountDataService
  // postSupplierAccountDataService
} from '../../../store/reducers/supplierAccountSlice'
import { InfoBtn } from '../../common/buttons'
import Checkbox from '../../common/Checkbox'
import Select from '../../common/Select'
import arrowTriangleImg from '../../../assets/img/icons/check-arrow.png'
import deleteImg from '../../../assets/img/icons/delete_Img_red.svg'
import {
  textFieldClasses,
  accountDetails__textFieldClasses,
  notificationCheckboxClasses,
  checkboxClasses,
  selectCountryClasses,
  selectPersonalPhoneClasses,
  selectBusinessPhoneClasses,
  selectBusinessSectorClasses,
  selectNumberOfEmployeesClasses,
  inputPhoneClasses
} from './constantsOfClassesStyles'
import Loader from '../../common/Loader'
import ImmutableTextFieldWithChangeButton from '../../common/ImmutableTextFieldWithChangeButton/ImmutableTextFieldWithChangeButton'
import {
  countryPrefix,
  numberWithoutPrefix
} from '../../../utils/phoneNumberSeparator'
import {
  setFirstName,
  setLastName
  // setCountry,
  // setPhone,
  // setEmail,
  // setLicence,
  // setLogo,
  // setShopName,
  // setBusinessSector,
  // setManufacturer,
  // setYearEstablished,
  // setNumberOfEmployees,
  // setAboutTheBusiness,
  // setPhotos,
  // setBusinessPhone,
  // setBusinessEmail,
  // setCompanyAddress
} from '../../../store/reducers/supplierAccountSlice'
import style from './SupplierAccountMainPage.module.css'

const SupplierAccountMainPage = () => {
  const companyPhotoPicker = useRef(null)
  const { isLoading, data } = useSelector((state) => state.supplierAccount)
  console.log('data', data)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onChange' })
  // const { first_name, last_name } = useSelector(
  //   (state) => state.supplierAccount.user_info
  // )
  // console.log('first_name', first_name)

  // const [selectedCompanyPhoto, setSelectedCompanyPhoto] = useState(null)
  // const [uploaded, setUploaded] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSupplierAccountDataService())
  }, [])

  const handleChange = (event) => {
    console.log(event.target.files)
    // setSelectedCompanyPhoto(event.target.files)
  }

  const handlePick = () => {
    companyPhotoPicker.current.click()
  }

  const renderPhoto = (photo, index) => {
    return (
      <>
        <div className={style.photo}>
          <img
            key={'key_' + index}
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

  const onSubmit = (info) => {
    // if (!isValid) return alert('info', info)
    console.log('info', info)

    // const updatedData = {
    //   user_info: {
    // first_name: first_name,
    // last_name: last_name,
    //   phone: '+7123456'
    // },
    // license: {
    //   license_number: '12345678'
    // },
    // company_info: {
    //   logo_url: 'string',
    //   name: 'string',
    //   business_sector: 'string',
    //   is_manufacturer: 0,
    //   year_established: 0,
    //   number_of_employees: 0,
    //   description: 'string',
    //   photo_url: ['string'],
    //   phone: '+90567845',
    //   business_email: 'user@example.com',
    //   address: 'string'
    // },
    // country: {
    //   country: 'Russia'
    // }
    // }
    // dispatch(postSupplierAccountDataService(updatedData))
  }

  if (isLoading) return <Loader />

  return (
    <>
      {data && (
        <div className={style.supplierCabinet}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      onChange={(e) => {
                        dispatch(setFirstName(e.target.value))
                      }}
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
                      onChange={(e) => {
                        dispatch(setLastName(e.target.value))
                      }}
                    />
                  </div>
                </div>
                <div className={style.subtitle}>
                  Country of company registration
                </div>
                <Select
                  defaultName="Select"
                  img={arrowTriangleImg}
                  options={['Turkey', 'Russia', 'USA', 'some other']}
                  classes={selectCountryClasses}
                  value={data.personal_info.country}
                />
                <div className={style.subtitle}>Personal phone number</div>
                <div className={style.profileInfo__number}>
                  <Select
                    defaultName="Select"
                    img={arrowTriangleImg}
                    options={['+7', '+90', 'other']}
                    classes={selectPersonalPhoneClasses}
                    value={countryPrefix(data.personal_info.phone)}
                  />
                  <PhoneNumFieldWithoutCountryCode
                    label=""
                    name="phone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(data.personal_info.phone)}
                  />
                </div>
                <div className={style.textFieldWrapper}>
                  <TextField
                    label="License or entrepreneur number"
                    name="license"
                    placeholder="000 – 00 – 0000"
                    classes={textFieldClasses}
                    defaultValue={data.personal_info.license_number.toString()}
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
                    <div className={style.selectName}>
                      Your main business sector
                    </div>
                    <Select
                      defaultName="Select"
                      img={arrowTriangleImg}
                      options={['Option1', 'Option2', 'Clothes']}
                      classes={selectBusinessSectorClasses}
                      value={data.business_profile.business_sector}
                    />
                  </div>
                </div>
                <Checkbox
                  label={'I am a manufacturer'}
                  classes={checkboxClasses}
                  defaultChecked={data.business_profile.is_manufacturer}
                />
                <div className={style.section_subtitle}>
                  Company Info (optional)
                </div>
                <div className={style.fieldsWrapper}>
                  <div className={style.flexContainer}>
                    <TextField
                      register={register('yearEstablished', {
                        required: 'Year established is required!',
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
                    <div className={style.selectName}>Number of employees</div>
                    <Select
                      defaultName="Select"
                      img={arrowTriangleImg}
                      options={['<10', '>10', '>50', '>100']}
                      classes={selectNumberOfEmployeesClasses}
                      value={data.business_profile.number_of_employees}
                    />
                  </div>
                </div>
                <div className={style.textareaName}>About the business</div>
                <textarea
                  className={style.aboutBussiness}
                  placeholder="Tell more about your company or business"
                  name="aboutBussiness"
                  // wrap="hard"
                  rows="5"
                  defaultValue={data.business_profile.description}
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
                <div className={style.subtitle}>Business phone number</div>
                <div className={style.profileInfo__number}>
                  <Select
                    defaultName="Select"
                    img={arrowTriangleImg}
                    options={['+7', '+90', 'other']}
                    classes={selectBusinessPhoneClasses}
                    value={countryPrefix(data.business_profile.phone)}
                  />
                  <PhoneNumFieldWithoutCountryCode
                    label=""
                    name="phone"
                    type="tel"
                    placeholder="(XXX) XXX - XX - XX"
                    classes={inputPhoneClasses}
                    defaultValue={numberWithoutPrefix(
                      data.business_profile.phone
                    )}
                  />
                </div>
                <div className={style.textFieldWrapper}>
                  <TextField
                    register={register('email', {
                      pattern: {
                        value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
                        message: 'Email is incorrect!'
                      }
                    })}
                    error={errors.email}
                    label="Business email address"
                    name="email"
                    placeholder="business@email.com"
                    classes={textFieldClasses}
                    defaultValue={data.business_profile.business_email}
                  />
                </div>
                <div className={style.textareaName}>Main company address</div>
                <textarea
                  className={style.aboutBussiness}
                  placeholder="Enter address"
                  name="bussinessAdress"
                  wrap="hard"
                  defaultValue={data.business_profile.address}
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
              onClick={(i) => onSubmit(i)}
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
      )}
    </>
  )
}

export default SupplierAccountMainPage
