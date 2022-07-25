import React from "react";
import style from "./userAccountPage.module.css";
import { Link } from "react-router-dom";
import iconImage from "../../../assets/img/icons/icon-img.png";
import TextField from "../../common/textField";
import { ButtonLink } from "../../common/buttons";
import Checkbox from "../../common/checkbox/checkbox";

const UserAccountPage = () => {
  const profileInfoBtnClasses = {
    wrepperButtonLink: `${style.wrepperButtonLinkProfile}`,
    wrepperBtnImg: `${style.wrepperBtnImgProfile}`,
    btnImg: `${style.btnImgProfile}`,
    btnName: `${style.btnNameProfile}`,
  };
  const ordersCategoryBtnClasses = {
    wrepperBtnImg: `${style.wrepperBtnImg}`,
    btnImg: `${style.btnImg}`,
    btnName: `${style.btnName}`,
  };
  const profileInfo__textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.profileInfo__textFieldInput}`,
  };
  const accountDetails__textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.accountDetails__textFieldInput}`,
    password: {
      inputTextFieldPassword: `${style.accountDetails__inputTextFieldPassword}`,
    },
  };
  const checkboxClasses = {
    labelCheckbox: `${style.labelCheckbox}`,
    inputCheckbox: `${style.inputCheckbox}`,
  };

  return (
    <div className={style.userCabinet}>
      <div className={style.userCabinet__contentWrapper}>
        <div className={`${style.section} ${style.profileInfo}`}>
          <div className={style.header__wrapper}>
            <div className={style.header}>Profile Info</div>
          </div>
          <ButtonLink
            name="Add image"
            src={iconImage}
            classes={profileInfoBtnClasses}
            href="*"
          />
          <div className={style.profileInfo__textFields}>
            <div className={style.flexContainer}>
              <TextField
                label="First name"
                name="firstName"
                placeholder="Enter first name"
                classes={profileInfo__textFieldClasses}
              />
            </div>
            <div className={style.flexContainer}>
              <TextField
                label="Last name"
                name="lastName"
                placeholder="Enter last name"
                classes={profileInfo__textFieldClasses}
              />
            </div>
          </div>
        </div>

        <div className={`${style.section} ${style.orders}`}>
          <div className={style.header__wrapper}>
            <div className={style.header}>Orders</div>
            <Link className={style.header__link} to="/">
              View All
            </Link>
          </div>
          <div className={style.ordersCategory__wrapper}>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Unpaid"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="To be shipped"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Shipped"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="To be reviewed"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Completed"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
          </div>
        </div>

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

        <div className={`${style.section} ${style.myAddresses}`}>
          <div className={style.header__wrapper}>
            <div className={style.header}>My Addresses</div>
            <Link className={style.header__link} to="/">
              Add new
            </Link>
          </div>
          <div className={style.myAddresses__wrapper}>
            <p className={style.noAddress}>
              You have not added any address yet.
            </p>
            <p className={style.noAddress}>
              Once you place your first order, you will be able to save your
              address.
            </p>
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
      </div>
    </div>
  );
};

export default UserAccountPage;
