import React, { useEffect } from 'react';

import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as LogOutIcon } from '../../assets/img/icons/log_out.svg';
import { Container } from '../../components';
import Address from '../../components/Address';
import UploadFile from '../../components/new-components/UploadFile/UploadFile';
import { Button, Checkbox, Input, Label } from '../../components/ui-kit';
import EditableInputWrapper from '../../components/ui-kit/EditableInputWrapper/EditableInputWrapper';
import { Action } from '../../services/user.service';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/reducers/loginSlice';

import style from './SellerAccountPage.module.css';

import { InfoBtn } from 'components/buttons';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Orders from 'pages/SellerAccountPage/Orders';

const SellerAccountPage = (): JSX.Element => {
  const { watch, setValue, reset } = useForm({});

  const [email, password, phone] = watch(['email', 'password', 'phone']);

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

  const dispatch = useAppDispatch();
  const onLogoutHandler = (): void => {
    dispatch(logout());
  };

  // const isAuth = useAppSelector(state => state.login.isAuth);
  // const navigate = useNavigate();

  // if (!isAuth) {
  //   navigate('/login');
  // }

  useEffect(() => {
    reset({ phone: '123', email: 'test', password: '1234' });
  }, []);

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
                <div className={style.profile_info_inputs_wrapper}>
                  <div className={style.flex_container}>
                    <label htmlFor="firstName" className={style.label}>
                      First name
                    </label>
                    <Input placeholder="Enter first name" id="firstName" />
                  </div>
                  <div className={style.flex_container}>
                    <label htmlFor="firstName" className={style.label}>
                      Last name
                    </label>
                    <Input placeholder="Enter last name" id="lastName" />
                  </div>
                </div>
              </div>
              <div className={style.section}>
                <div className={style.header_wrapper}>
                  <div className={style.header}>Account Details</div>
                </div>
                <div className={style.account_details_wrapper}>
                  <Label label="Email">
                    <EditableInputWrapper
                      type="text"
                      value={email}
                      onChangeValue={value => setValue('email', value)}
                    />
                  </Label>
                  <Label label="Phone Number">
                    <EditableInputWrapper
                      type="text"
                      value={phone}
                      onChangeValue={value => setValue('phone', value)}
                    />
                  </Label>
                  <Label label="Password">
                    <EditableInputWrapper
                      type="password"
                      value={password}
                      onChangeValue={value => setValue('password', value)}
                    />
                  </Label>
                </div>
              </div>
              <div className={cn(style.remove_wrapper, style.section)}>
                <Link className={style.remove_account_link} to="/">
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
