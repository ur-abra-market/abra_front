import React from 'react'
import { Link } from 'react-router-dom'
import iconImage from '../../../assets/img/icons/icon-img.png'
import TextField from '../../common/TextField'
import PhoneNumFieldWithoutCountryCode from '../../common/PhoneNumFieldWithoutCountryCode'
import { InfoBtn } from '../../common/buttons'
import Checkbox from '../../common/checkbox'
import Select from '../../common/Select'
import arrowTriangleImg from '../../../assets/img/icons/check-arrow.png'
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
import style from './SupplierAccountMainPage.module.css'

const SupplierAccountMainPage = () => {
  return (
    <div className={style.supplierCabinet}>
      <div className={style.supplierCabinet__contentWrapper}>
        <div className={`${style.section} ${style.profileInfo}`}>
          <div className={style.header__wrapper}>
            <div className={style.header}>Profile Info</div>
          </div>
          <div className={style.fieldsWrapper}>
            <div className={style.flexContainer}>
              <TextField
                label="First name"
                name="firstName"
                placeholder="Enter first name"
                classes={textFieldClasses}
              />
            </div>
            <div className={style.flexContainer}>
              <TextField
                label="Last name"
                name="lastName"
                placeholder="Enter last name"
                classes={textFieldClasses}
              />
            </div>
          </div>
          <div className={style.subtitle}>Country of company registration</div>
          <Select
            defaultName="Select"
            img={arrowTriangleImg}
            options={['Turkey', 'Russia', 'some other']}
            classes={selectCountryClasses}
          />
          <div className={style.subtitle}>Personal phone number</div>
          <div className={style.profileInfo__number}>
            <Select
              defaultName="+90"
              img={arrowTriangleImg}
              options={['+7', '+90', 'other']}
              classes={selectPersonalPhoneClasses}
            />
            <PhoneNumFieldWithoutCountryCode
              label=""
              name="phone"
              type="tel"
              placeholder="(XXX) XXX - XX - XX"
              classes={inputPhoneClasses}
            />
          </div>
          <div className={style.textFieldWrapper}>
            <TextField
              label="License or entrepreneur number"
              name="license"
              placeholder="000 – 00 – 0000"
              classes={textFieldClasses}
            />
          </div>
        </div>

        <div className={`${style.section} ${style.businessProfile}`}>
          <div className={style.header__wrapper}>
            <div className={style.header}>Business Profile</div>
          </div>
          <div className={style.profileLogo}>
            <div className={style.profileLogo_backgroung}>
              <img
                className={style.profileLogo_img}
                src={iconImage}
                alt="logo"
              />
            </div>
            <div className={style.profileLogo_description}>
              <div className={style.profileLogo_descriptionTitle}>
                Add logo or profile image
              </div>
              <div className={style.profileLogo_descriptionSubtitle}>
                The customers will recognizeyour
              </div>
              <div className={style.profileLogo_descriptionSubtitle}>
                store by this image
              </div>
            </div>
          </div>
          <div className={style.fieldsWrapper}>
            <div className={style.flexContainer}>
              <TextField
                label="Shop name (will be shown on the profile)"
                name="shopName"
                placeholder="Enter your company or store name"
                classes={textFieldClasses}
              />
            </div>
            <div className={style.flexContainer}>
              <div className={style.selectName}>Your main business sector</div>
              <Select
                defaultName="Select"
                img={arrowTriangleImg}
                options={['Option1', 'Option2', 'Option3']}
                classes={selectBusinessSectorClasses}
              />
            </div>
          </div>
          <Checkbox label={'I am a manufacturer'} classes={checkboxClasses} />
          <div className={style.section_subtitle}>Company Info (optional)</div>
          <div className={style.fieldsWrapper}>
            <div className={style.flexContainer}>
              <TextField
                label="Year established"
                name="yearEstablished"
                placeholder="Enter the year"
                classes={textFieldClasses}
              />
            </div>
            <div className={style.flexContainer}>
              <div className={style.selectName}>Number of employees</div>
              <Select
                defaultName="Select"
                img={arrowTriangleImg}
                options={['<10', '>10', '>50', '>100']}
                classes={selectNumberOfEmployeesClasses}
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
          />
          <div className={style.textareaName}>
            Photo of the company or production
          </div>
          <div className={style.companyPhotoWrapper}>
            <div className={style.companyPhoto_backgroung}>
              <img
                className={style.companyPhoto_img}
                src={iconImage}
                alt="img"
              />
            </div>
            <div className={style.companyPhoto_backgroung}>
              <img
                className={style.companyPhoto_img}
                src={iconImage}
                alt="img"
              />
            </div>
            <div className={style.companyPhoto_backgroung}>
              <img
                className={style.companyPhoto_img}
                src={iconImage}
                alt="img"
              />
            </div>
            <div className={style.companyPhoto_backgroung}>
              <img
                className={style.companyPhoto_img}
                src={iconImage}
                alt="img"
              />
            </div>
            <div className={style.companyPhoto_backgroung}>
              <img
                className={style.companyPhoto_img}
                src={iconImage}
                alt="img"
              />
            </div>
          </div>

          <div className={style.section_subtitle}>Contacts (optional)</div>
          <div className={style.subtitle}>Business phone number</div>
          <div className={style.profileInfo__number}>
            <Select
              defaultName="+90"
              img={arrowTriangleImg}
              options={['+7', '+90', 'other']}
              classes={selectBusinessPhoneClasses}
            />
            <PhoneNumFieldWithoutCountryCode
              label=""
              name="phone"
              type="tel"
              placeholder="(XXX) XXX - XX - XX"
              classes={inputPhoneClasses}
            />
          </div>
          <div className={style.textFieldWrapper}>
            <TextField
              label="Business email address"
              name="email"
              placeholder="business@email.com"
              classes={textFieldClasses}
            />
          </div>
          <div className={style.textareaName}>Main company address</div>
          <textarea
            className={style.aboutBussiness}
            placeholder="Enter address"
            name="bussinessAdress"
            wrap="hard"
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
              <TextField
                label="Email"
                name="email"
                placeholder="Enter your email"
                classes={accountDetails__textFieldClasses}
              />
            </div>
            <div className={style.flexContainer}>
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your email password"
                classes={accountDetails__textFieldClasses}
              />
            </div>
          </div>
        </div>
      </div>
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
  )
}

export default SupplierAccountMainPage
