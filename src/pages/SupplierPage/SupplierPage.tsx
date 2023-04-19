import React, { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import Loader from '../../components/Loader';
import { Status } from '../../enums/status.enum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSupplierAccountDataService,
  getSupplierNotifications,
} from '../../store/reducers/supplierAccountSlice';
import { getCompanyInfoService } from '../../store/reducers/supplierSlice';

// import style from './SupplierPage.module.css';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

const SupplierPage = (): JSX.Element => {
  const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(state => state.supplierAccount.isLoading);
  const supplierInfo = useAppSelector(state => state.supplierAccount.supplierInfo);

  useEffect(() => {
    dispatch(getCompanyInfoService());
    dispatch(getSupplierAccountDataService());
    dispatch(getSupplierNotifications());
    setIsGetCompanyInfo(true);
  }, [dispatch]);

  // const navbarCategoryBtnClasses = {
  //   wrepperBtnImg: `${style.wrapper_btn_img}`,
  //   btnImg: `${style.btn_img}`,
  //   btnName: `${style.btn_name}`,
  // };

  // const SelectBussinessClasses = {
  //   selectWrapper: `${style.select_wrapper}`,
  //   select_headerWrapper: `${style.select_header_rapper}`,
  //   select_header: `${style.select_header}`,
  //   select_options: `${style.select_options}`,
  //   option: `${style.option}`,
  // };

  useEffect(() => {
    if (isGetCompanyInfo && isLoading && !supplierInfo) navigate('../account-setup');
  }, [supplierInfo, isGetCompanyInfo, isLoading, navigate]);

  if (isLoading === Status.Loading) {
    return <Loader />;
  }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};

export default SupplierPage;
