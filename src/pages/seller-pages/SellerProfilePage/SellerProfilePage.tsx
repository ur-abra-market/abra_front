import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { AccountManagement } from '../../../components';
import { getSellerNotifications } from '../../../store/reducers/seller/profile';

import { Address } from './Address/Address';
import Orders from './Orders/Orders';
import { SellerNotifications } from './SellerNotifications/SellerNotifications';
import style from './SellerProfilePage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { SellerPersonalInfoChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';
import { getCountries } from 'store/reducers/commonSlice';
import { IAddress } from 'store/reducers/seller/profile/slice';
import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

type FormValues = {
  first_name: string;
  last_name: string;
};

// export const _SellerAccountPage = (): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const isFeedbackOpen = useAppSelector(state => state.app.isFeedbackOpen);
//
//   const { first_name, last_name } = useAppSelector(
//     state => state.sellerProfile.personalInfo,
//   );
//   const addresses = useAppSelector(state => state.sellerCheckout.addresses); // фиксил ошибки, заглушка
//
//   const { register, handleSubmit, reset } = useForm<FormValues>({
//     defaultValues: {
//       first_name,
//       last_name,
//     },
//   });
//
//   const onSubmit = (data: FormValues): void => {
//     // dispatch(sendSellerInfoService(data));
//   };
//
//   const options: ISelectOption[] = [
//     { label: '+90', value: '+90' },
//     { label: '+7', value: '+7' },
//   ];
//
//   useEffect(() => {
//     // dispatch(getSellerInfoService());
//     dispatch(getSellerAddressesService());
//   }, [dispatch]);
//
//   useEffect(() => {
//     reset({
//       first_name,
//       last_name,
//     });
//   }, [first_name, last_name, reset]);
//
//   return (
//     <div className={style.seller_page}>
//       <Header />
//       <Container>
//         <div className={style.seller_cabinet}>
//           <div className={style.content_wrapper}>
//             <div className={style.left_column}>
//               <div className={style.section}>
//                 <div className={style.header_wrapper}>
//                   <div className={style.header}>Profile Info</div>
//                   <ButtonLogOut />
//                 </div>
//                 <div className={style.button_link_container}>
//                   <UploadImage action={Action.UPLOAD_LOGO_IMAGE} type="logo" />
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className={style.names_container}>
//                     <div className={style.flex_container}>
//                       <Label
//                         htmlFor="firstName"
//                         className={style.label}
//                         label="First name"
//                       />
//                       <Input placeholder="Enter first name" {...register('first_name')} />
//                     </div>
//                     <div className={style.flex_container}>
//                       <Label
//                         htmlFor="lastName"
//                         className={style.label}
//                         label="Last name"
//                       />
//                       <Input placeholder="Enter last name" {...register('last_name')} />
//                     </div>
//                   </div>
//                   <div className={style.phone_container}>
//                     <div className={style.phone_code}>
//                       <label htmlFor="phoneCode" className={style.label}>
//                         Personal phone number
//                       </label>
//                       <Select options={options} padding="23px" className={style.select} />
//                     </div>
//                     <div className={style.phone} />
//                   </div>
//                   <Button className={style.save_button} type="submit">
//                     Save
//                   </Button>
//                 </form>
//               </div>
//
//               <AccountManagement />
//             </div>
//
//             <div className={style.center_column}>
//               <div className={style.section}>
//                 <Orders />
//               </div>
//
//               <div className={style.section}>
//                 <div className={style.header_wrapper}>
//                   <div className={style.header}>My Addresses</div>
//                   <Link className={style.header_link} to="/">
//                     Add new
//                   </Link>
//                 </div>
//                 <div className={style.my_addresses_wrapper}>
//                   {addresses ? (
//                     <div className={style.addresses_container}>
//                       {addresses.map((a: any, i: number) => (
//                         <Address key={`address_${i}`} address={a} />
//                       ))}
//                     </div>
//                   ) : (
//                     <div>
//                       <p className={style.no_address}>
//                         You have not added any address yet.
//                       </p>
//                       <p className={style.no_address}>
//                         Once you place your first order, you will be able to save your
//                         address.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//
//             <div className={style.right_column}>
//               <div className={cn(style.section, style.section_notifications)}>
//                 <div className={style.header_wrapper}>
//                   <div className={cn(style.header, style.header_notifications)}>
//                     Notifications
//                   </div>
//                 </div>
//
//                 <div className={style.notifications_list}>
//                   <SellerNotifications />
//                 </div>
//               </div>
//             </div>
//             <FeedbackForm isFeedbackOpen={isFeedbackOpen} />
//             <ButtonInfo className={style.info_button_positioning} />
//           </div>
//         </div>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

export const SellerProfilePage = WithLayout((): JSX.Element => {
  const addresses = useAppSelector(state => state.sellerProfile.addresses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerAddresses());
    dispatch(getSellerNotifications());
    dispatch(getCountries());
  }, []);

  return (
    <div className={style.seller_cabinet}>
      <div className={style.seller_cabinet_content_wrapper}>
        <SellerPersonalInfoChangeForm />

        <div className={style.seller_info}>
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
                  {addresses.map((a: IAddress) => (
                    <Address key={a.id} address={a} />
                  ))}
                </div>
              ) : (
                <div>
                  <p className={style.no_address}>You have not added any address yet.</p>
                  <p className={style.no_address}>
                    Once you place your first order, you will be able to save your
                    address.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.notifications}>
          <SellerNotifications />
        </div>
      </div>
    </div>
  );
});
