import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from '../../components';

import LogoutButton from './LogoutButton';
import style from './SellerAccountPage.module.css';

import addImgIcon from 'assets/img/icons/add_image.svg';
import { ButtonLink, InfoBtn } from 'components/buttons';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import {
  profileInfo__textFieldClasses,
  accountDetails__textFieldClasses,
  checkboxClasses,
} from 'pages/SellerAccountPage/classesStyles';
import Orders from 'pages/SellerAccountPage/orders';

const SellerAccountPage = (): JSX.Element => {
  const addImageBtnClasses = {
    wrepperButtonLink: `${style.wrepper_button_link}`,
    btnImg: `${style.btn_img}`,
    btnName: `${style.btn_name}`,
  };

  return (
    <>
      <Header />
      <Container>
        <div className={style.seller_cabinet}>
          <div className={style.content_wrapper}>
            <div className={style.left_column}>
              <div className={style.section}>
                <div className={style.header_wrapper}>
                  <div className={style.header}>Profile Info</div>
                  <LogoutButton />
                </div>
                <div className={style.button_link_container}>
                  <ButtonLink
                    name="Add image"
                    src={addImgIcon}
                    classes={addImageBtnClasses}
                  />
                </div>
                <div className={style.profile_info_inputs_wrapper}>
                  <div className={style.flex_container}>
                    <TextField
                      label="First name"
                      name="firstName"
                      placeholder="Enter first name"
                      classes={profileInfo__textFieldClasses}
                    />
                  </div>
                  <div className={style.flex_container}>
                    <TextField
                      label="Last name"
                      name="lastName"
                      placeholder="Enter last name"
                      classes={profileInfo__textFieldClasses}
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
                      classes={accountDetails__textFieldClasses}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <TextField
                      label="Phone number"
                      name="phoneNumber"
                      classes={accountDetails__textFieldClasses}
                    />
                  </div>
                  <div className={style.flexContainer}>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      classes={accountDetails__textFieldClasses}
                    />
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

            <div className={style.center_column}>
              <div className={`${style.section} ${style.orders}`}>
                <Orders />
              </div>
              <div className={`${style.section} ${style.myAddresses}`}>
                <div className={style.header__wrapper}>
                  <div className={style.header}>My Addresses</div>
                  <Link className={style.header__link} to="/">
                    Add new
                  </Link>
                </div>
                <div className={style.myAddresses__wrapper}>
                  <p className={style.noAddress}>You have not added any address yet.</p>
                  <p className={style.noAddress}>
                    Once you place your first order, you will be able to save your
                    address.
                  </p>
                </div>
              </div>
            </div>

            <div className={style.right_column}>
              <div className={`${style.section} ${style.notifications}`}>
                <div className={style.header__wrapper}>
                  <div className={style.header}>Notifications</div>
                </div>
                <div className={style.notificationsList}>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Discounts & offers" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Order updates" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Order reminders" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="On stock again" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Product is cheaper" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Your favorites new" classes={checkboxClasses} />
                  </div>
                  <div className={style.notificationsList__item}>
                    <Checkbox label="Account support" classes={checkboxClasses} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default SellerAccountPage;
