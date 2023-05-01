import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/ui-kit';
import { personalSupplierInfoValidationSchema } from '../../constants/personalSupplierInfoValidationSchema';

import BusinessProfileChangeForm from './BusinessProfileChangeForm/BusinessProfileChangeForm';
import NotificationsChangeForm from './NotificationsChangeForm/NotificationsChangeForm';
import { PersonalInfoChangeForm } from './PersonalInfoChangeForm/PersonalInfoChangeForm';
import style from './SupplierAccountMainPage.module.css';

// import { getUserNotificationsService } from 'store/reducers/userSlice';

// const defaultValue = {
//   notifications: {
//     on_discount: false,
//     on_order_updates: false,
//     on_order_reminders: false,
//     on_stock_again: false,
//     on_product_is_cheaper: false,
//     on_your_favorites_new: false,
//     on_account_support: false,
//   },
// };

interface IAccountInfoData {
  firstName: string;
  lastName: string;
  license: string;
  country: string;
  tel: string;
  code: string;
}
const SupplierAccountMainPage = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  // const companyPhotoPicker = useRef(null);
  // const navigate = useNavigate();
  // const { isLoading } = useAppSelector(state => state.supplierAccount);
  // const [images, setImages] = useState([]);
  // const [, setSelectedCompanyPhoto] = useState(null);

  // const {
  //   register,
  //   reset,
  //   setValue,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({
  //   defaultValues: defaultValue,
  // });

  // const handleChange = (event: any): void => {
  //   if (event.target.files.length > 0) setSelectedCompanyPhoto(event.target.files[0]);
  // };

  // const renderPhoto = (photo: any): JSX.Element => {
  //   return (
  //     <>
  //       <img
  //         style={{
  //           width: '95px',
  //           height: '95px',
  //           borderRadius: '10px',
  //         }}
  //         src={`${photo}`}
  //         alt="img"
  //       />
  //       <button type="button" className={style.photoRemove}>
  //         <img src={deleteImg} alt="close" />
  //       </button>
  //     </>
  //   );
  // };

  // const onSubmitInfo = (updatedData: any): void => {
  // const formData = new FormData();
  // const personalDataForDispatch = {
  //   user_info: {
  //     first_name: updatedData.firstName,
  //     last_name: updatedData.lastName,
  //     phone: updatedData.code + updatedData.phone,
  //   },
  //   license: {
  //     license_number: updatedData.license,
  //   },
  //   company_info: {
  //     logo_url: 'https://mySite.ru',
  //     name: updatedData.shopName,
  //     business_sector: updatedData.businessSector,
  //     is_manufacturer: updatedData.is_manufacturer === true ? 1 : 0,
  //     year_established: +updatedData.yearEstablished,
  //     number_of_employees: 12, // updatedData.numberOfEmployees,
  //     description: updatedData.aboutBusiness,
  //     phone: updatedData.businessPhoneCode + updatedData.businessPhone,
  //     business_email: updatedData.businessEmail,
  //     address: updatedData.businessAdress,
  //   },
  //   country: {
  //     country: updatedData.country,
  //   },
  // };
  // const notifications = {
  //   on_discount: updatedData.discountsOffers,
  //   on_order_updates: updatedData.orderUpdates,
  //   on_order_reminders: updatedData.orderReminders,
  //   on_stock_again: updatedData.onStockAgain,
  //   on_product_is_cheaper: updatedData.productIsCheaper,
  //   on_your_favorites_new: updatedData.yourFavoritesNew,
  //   on_account_support: updatedData.accountSupport,
  // };
  //
  // console.log(' dataForDispatch', personalDataForDispatch);
  // console.log(' notificationsForDispatch', notifications);
  // dispatch(postSupplierAccountDataService(personalDataForDispatch));
  // dispatch(postSupplierNotifications(notifications));

  // dispatch(uploadUserLogoService())
  //   dispatch(updateSupplierNotifications(updatedData.notifications));
  // };

  // useEffect(() => {
  //   dispatch(getSupplierAccountDataService());
  //   dispatch(getUserNotificationsService());
  // }, [dispatch]);

  // if (isLoading) return <Loader />;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IAccountInfoData>({
    resolver: yupResolver(personalSupplierInfoValidationSchema),
    mode: 'all',
  });

  const onSubmit = (data: IAccountInfoData): void => {
    console.log(data); // todo
    reset();
  };

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <div className={style.personal_info}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalInfoChangeForm register={register} errors={errors} />
            <Button
              type="submit"
              disabled={!isValid}
              className={style.personal_info_submit_btn}
              label="Save"
            />
          </form>
        </div>

        <div className={style.business_profile}>
          <BusinessProfileChangeForm />
        </div>
        <div className={style.account_details}>
          <div className={style.details_block}>
            <button type="button">Change your email</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
          <div className={style.details_block}>
            <button type="button">Change your password</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
          <div className={style.details_block}>
            <button type="button">Remove the account?</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
        </div>
        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};

export default SupplierAccountMainPage;
