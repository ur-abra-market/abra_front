import { useEffect } from 'react';

import cn from 'classnames';
import { AccountManagement, UploadImage } from 'components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { ButtonLogOut } from '../../../components/ButtonLogOut/ButtonLogOut';
import FeedbackForm from '../../../components/feedbacks/FeedbackForm';
import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';
import { Action } from '../../../services/user/user.service';

import { Address } from './Address/Address';
import Orders from './Orders/Orders';
import style from './SellerAccountPage.module.css';

import {
  getSellerAddressesService,
  getSellerInfoService,
  sendSellerInfoService,
} from 'store/reducers/sellerSlice';
import {
  Button,
  ButtonInfo,
  Checkbox,
  Container,
  Input,
  ISelectOption,
  Label,
  Select,
} from 'ui-kit';

type FormValues = {
  first_name: string;
  last_name: string;
};

export const SellerAccountPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(state => state.auth.isAuthorized);
  const isFeedbackOpen = useAppSelector(state => state.app.isFeedbackOpen);

  const { first_name, last_name } = useAppSelector(state => state.seller.userProfileInfo);
  const addresses = useAppSelector(state => state.sellerCheckout.addresses); // фиксил ошибки, заглушка

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      first_name,
      last_name,
    },
  });

  const onSubmit = (data: FormValues): void => {
    dispatch(sendSellerInfoService(data));
  };

  // const userData = {
  //   first_name: 'Olga',
  //   last_name: 'Andreeva',
  // };

  // const userAddress = {
  //   country: 'Russian Federation',
  //   area: 'Moscow',
  //   city: 'Moscow',
  //   street: 'Jaroslava Gasheka 6',
  //   building: '2',
  //   appartment: 'apartment 904',
  //   postal_code: '589964',
  // };
  //
  // const addressExample = {
  //   seller_address: userAddress,
  // };

  // const addresses = [addressExample];

  const onNotificationChange = (id: string, isChecked: boolean): void => {};

  const options: ISelectOption[] = [
    { label: '+90', value: '+90' },
    { label: '+7', value: '+7' },
  ];

  useEffect(() => {
    dispatch(getSellerInfoService());
    dispatch(getSellerAddressesService());
  }, [dispatch]);

  useEffect(() => {
    reset({
      first_name,
      last_name,
    });
  }, [first_name, last_name, reset]);

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
                  <ButtonLogOut />
                </div>
                <div className={style.button_link_container}>
                  <UploadImage action={Action.UPLOAD_LOGO_IMAGE} type="logo" />
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
                      <Select options={options} padding="23px" className={style.select} />
                    </div>
                    <div className={style.phone}>
                      {/* <InputWithMask */}
                      {/*  mask="(999) 999-9999" */}
                      {/*  placeholder="(XXX) XXX-XXXX" */}
                      {/*  className={style.mask} */}
                      {/* /> */} todo add inputPhoneNumber here when he will be ready
                    </div>
                  </div>
                  <Button className={style.save_button} type="submit">
                    Save
                  </Button>
                </form>
              </div>

              <AccountManagement />
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
                  <Checkbox
                    id="on_discount"
                    variant="notification"
                    label="Discounts & offers"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_order_updates"
                    variant="notification"
                    label="Order updates"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_order_reminders"
                    variant="notification"
                    label="Order reminders"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_stock_again"
                    variant="notification"
                    label="On stock again"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_product_is_cheaper"
                    variant="notification"
                    label="Product is cheaper"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_your_favorites_new"
                    variant="notification"
                    label="Your favorites new"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                  <Checkbox
                    id="on_account_support"
                    variant="notification"
                    label="Account support"
                    className={style.notifications_item}
                    checked={false}
                    onChange={event =>
                      onNotificationChange(
                        event.currentTarget.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <FeedbackForm isFeedbackOpen={isFeedbackOpen} />
            <ButtonInfo className={style.info_button_positioning} />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
