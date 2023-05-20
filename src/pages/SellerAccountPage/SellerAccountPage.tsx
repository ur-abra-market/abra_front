import React, { useEffect } from 'react';

import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as LogOutIcon } from '../../assets/img/icons/log_out.svg';
import { Container } from '../../components';
import Address from '../../components/Address';
import FeedbackForm from '../../components/new-components/feedback/FeedbackForm';
import Notifications from '../../components/new-components/Notifications';
import { INotificationsItem } from '../../components/new-components/Notifications/Notifications';
import UploadFile from '../../components/new-components/UploadFile/UploadFile';
import { Button, Input, InputWithMask, Label, Select } from '../../components/ui-kit';
import { IOption } from '../../components/ui-kit/Select/Select.props';
import { Action } from '../../services/user.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/reducers/loginSlice';
import {
  getSellerAddressesService,
  sendSellerInfoService,
} from '../../store/reducers/sellerSlice';

import style from './SellerAccountPage.module.css';

import { InfoBtn } from 'components/buttons';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Orders from 'pages/SellerAccountPage/Orders';

type FormValues = {
  first_name: string;
  last_name: string;
};

const SellerAccountPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(state => state.login.isAuth);
  const isFeedbackOpen = useAppSelector(state => state.app.isFeedbackOpen);

  const { first_name, last_name } = useAppSelector(state => state.seller.userProfileInfo);
  const addresses = useAppSelector(state => state.sellerCheckout.addresses); // фиксил ошибки, заглушка

  const notifications = useAppSelector(state => state.login.notifications);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      first_name,
      last_name,
    },
  });

  const onSubmit = (data: FormValues): void => {
    dispatch(sendSellerInfoService(data));
  };

  const onLogoutHandler = (): void => {
    dispatch(logout());
  };

  const notificationsKeys = Object.keys(notifications ?? []);

  const NOTIFICATIONS_DATA: INotificationsItem[] = [
    {
      id: notificationsKeys[1],
      value: notifications ? notifications.on_discount : false,
      label: 'Discounts & offers',
    },
    {
      id: notificationsKeys[2],
      value: notifications ? notifications.on_order_updates : false,
      label: 'Order updates',
    },
    {
      id: notificationsKeys[3],
      value: notifications ? notifications.on_order_reminders : false,
      label: 'Order reminders',
    },
    {
      id: notificationsKeys[4],
      value: notifications ? notifications.on_stock_again : false,
      label: 'On stock again',
    },
    {
      id: notificationsKeys[5],
      value: notifications ? notifications.on_product_is_cheaper : false,
      label: 'Product is cheaper',
    },
    {
      id: notificationsKeys[6],
      value: notifications ? notifications.on_your_favorites_new : false,
      label: 'Your favorites new',
    },
    {
      id: notificationsKeys[7],
      value: notifications ? notifications.on_account_support : false,
      label: 'Account support',
    },
  ];

  const options: IOption[] = [
    { label: '+90', value: '+90' },
    { label: '+7', value: '+7' },
  ];

  useEffect(() => {
    dispatch(getSellerAddressesService());
    // dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    reset({
      first_name,
      last_name,
    });
  }, [first_name, last_name, reset]);

  // if (!isAuth) {
  //   return <Navigate to="/auth" />;
  // }

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
                      <Label
                        htmlFor="firstName"
                        className={style.label}
                        label="First name"
                      />
                      <Input placeholder="Enter first name" {...register('first_name')} />
                    </div>
                    <div className={style.flex_container}>
                      <Label
                        htmlFor="lastName"
                        className={style.label}
                        label="Last name"
                      />
                      <Input placeholder="Enter last name" {...register('last_name')} />
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
                      {addresses.map((a: any, i: number) => (
                        <Address key={`address_${i}`} address={a} />
                      ))}
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
                  <Notifications notificationsData={NOTIFICATIONS_DATA} />
                </div>
              </div>
            </div>
            <FeedbackForm isFeedbackOpen={isFeedbackOpen} />
            <InfoBtn className={style.info_button_positioning} />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default SellerAccountPage;
