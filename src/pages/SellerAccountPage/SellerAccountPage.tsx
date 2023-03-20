import React, { useEffect } from 'react';

import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as LogOutIcon } from '../../assets/img/icons/log_out.svg';
import { Container } from '../../components';
import Address from '../../components/Address';
import UploadFile from '../../components/new-components/UploadFile/UploadFile';
import { Button, Checkbox, Input, InputWithMask, Select } from '../../components/ui-kit';
import { IOption } from '../../components/ui-kit/Select/Select.props';
import { Action } from '../../services/user.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/reducers/loginSlice';
import {
  getSellerInfoService,
  sendSellerInfoService,
} from '../../store/reducers/sellerSlice';

import style from './SellerAccountPage.module.css';

import { InfoBtn } from 'components/buttons';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Orders from 'pages/SellerAccountPage/Orders';

type FormValues = {
  firstName: string;
  lastName: string;
};

const SellerAccountPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(state => state.seller.userProfileInfo.first_name);
  const lastName = useAppSelector(state => state.seller.userProfileInfo.last_name);

  // const notifications = useAppSelector(state => state.seller.notifications);

  const { setValue, watch, reset, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const [fistNameWatched, lastNameWatched] = watch(['firstName', 'lastName']);

  const onSubmit = (data: FormValues): void => {
    dispatch(
      sendSellerInfoService({ first_name: data.firstName, last_name: data.lastName }),
    );
  };

  const addressExample = {
    firstname: 'Olga',
    lastname: 'Andreeva',
    phone: '+79158448547',
    street: 'Jaroslava Gasheka 6, building 2',
    apartment: 'apartment 904',
    city: 'Moscow',
    region: '',
    state: '',
    country: 'Russian Federation',
    zipcode: '589964',
  };

  const addresses = [addressExample];

  const onLogoutHandler = (): void => {
    dispatch(logout());
  };

  // const isAuth = useAppSelector(state => state.login.isAuth);
  // const navigate = useNavigate();

  // if (!isAuth) {
  //   navigate('/login');
  // }

  const options: IOption[] = [
    { label: '+90', value: '+90' },
    { label: '+7', value: '+7' },
  ];

  useEffect(() => {
    dispatch(getSellerInfoService());
  }, []);

  useEffect(() => {
    reset({ firstName, lastName });
  }, [firstName, lastName]);

  return (
    <div className={style.seller_page}>
      <Header />
      <Container>
        <div className={style.seller_cabinet}>
          <div className={style.content_wrapper}>
            <div className={style.left_column}>
              <div className={style.section}>
                <div className={style.header_wrapper}>
                  <div className={style.header}>Profile Info</div>
                  <Button
                    color="white"
                    className={style.logout_button}
                    onClick={onLogoutHandler}
                  >
                    <div className={style.logout_button_title}>Log Out</div>
                    <LogOutIcon />
                  </Button>
                </div>
                <div className={style.button_link_container}>
                  <UploadFile action={Action.UPLOAD_LOGO} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={style.names_container}>
                    <div className={style.flex_container}>
                      <label htmlFor="firstName" className={style.label}>
                        First name
                      </label>
                      <Input
                        placeholder="Enter first name"
                        id="firstName"
                        value={fistNameWatched}
                        onChange={value => {
                          setValue('firstName', value.currentTarget.value);
                        }}
                      />
                    </div>
                    <div className={style.flex_container}>
                      <label htmlFor="lastName" className={style.label}>
                        Last name
                      </label>
                      <Input
                        placeholder="Enter last name"
                        id="lastName"
                        value={lastNameWatched}
                        onChange={value => {
                          setValue('lastName', value.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={style.phone_container}>
                    <div className={style.phone_code}>
                      <label htmlFor="phoneCode" className={style.label}>
                        Personal phone number
                      </label>
                      <Select options={options} />
                    </div>
                    <div className={style.phone}>
                      <InputWithMask
                        mask="(999) 999-9999"
                        placeholder="(XXX) XXX-XXXX"
                        className={style.mask}
                      />
                    </div>
                  </div>
                  <Button className={style.save_button} type="submit">
                    Save
                  </Button>
                </form>
              </div>

              <div className={cn(style.link_wrapper, style.section)}>
                <Link className={style.link} to="/changeEmail">
                  Change your email
                </Link>
                <div className={style.link_description}>
                  (All your data including order history will be deleted)
                </div>
              </div>
              <div className={cn(style.link_wrapper, style.section)}>
                <Link className={style.link} to="/changePassword">
                  Change your password
                </Link>
                <div className={style.link_description}>
                  (All your data including order history will be deleted)
                </div>
              </div>
              <div className={cn(style.link_wrapper, style.section)}>
                <Link className={style.link} to="/">
                  Remove the account?
                </Link>
                <div className={style.link_description}>
                  (All your data including order history will be deleted)
                </div>
              </div>
            </div>

            <div className={style.center_column}>
              <div className={style.section}>
                <Orders />
              </div>

              <div className={style.section}>
                <div className={style.header_wrapper}>
                  <div className={style.header}>My Addresses</div>
                  <Link className={style.header_link} to="/">
                    Add new
                  </Link>
                </div>
                <div className={style.my_addresses_wrapper}>
                  {addresses ? (
                    <div className={style.addresses_container}>
                      <Address address={addressExample} />
                    </div>
                  ) : (
                    <div>
                      <p className={style.no_address}>
                        You have not added any address yet.
                      </p>
                      <p className={style.no_address}>
                        Once you place your first order, you will be able to save your
                        address.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={style.right_column}>
              <div className={cn(style.section, style.section_notifications)}>
                <div className={style.header_wrapper}>
                  <div className={cn(style.header, style.header_notifications)}>
                    Notifications
                  </div>
                </div>

                <div className={style.notifications_list}>
                  <Checkbox
                    variant="notification"
                    label="Discounts & offers"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="Order updates"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="Order reminders"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="On stock again"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="Product is cheaper"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="Your favorites new"
                    className={style.notifications_item}
                  />
                  <Checkbox
                    variant="notification"
                    label="Account support"
                    className={style.notifications_item}
                  />
                </div>
              </div>
            </div>

            <InfoBtn className={style.info_button_positioning} />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default SellerAccountPage;
