import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import arrowTriangleImg from '../../assets/img/icons/check-arrow.png';
import iconImage from '../../assets/img/icons/icon-img.png';
import bellImg from '../../assets/img/icons/notification-bell.png';
import { ButtonLink } from '../../components/buttons';
import FooterForSupplierPart from '../../components/FooterForSupplierPart';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import NavBarUniversal from '../../components/ui/NavBarUniversal/NavBarUniversal';
import SupplierMenu from '../../components/ui/SupplierMenu/SupplierMenu';
import { getSupplierAccountDataService } from '../../store/reducers/supplierAccountSlice';
import { getCompanyInfoService } from '../../store/reducers/supplierSlice';

import style from './SupplierPage.module.css';

const SupplierPage = () => {
  const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.supplier.loading);
  const companyInfo = useSelector(state => state.supplier.companyInfo);

  useEffect(() => {
    console.log('nnnnn');
    dispatch(getCompanyInfoService());
    dispatch(getSupplierAccountDataService());
    setIsGetCompanyInfo(true);
  }, []);
  console.log(isLoading);

  const navbarCategoryBtnClasses = {
    wrepperBtnImg: `${style.wrepperBtnImg}`,
    btnImg: `${style.btnImg}`,
    btnName: `${style.btnName}`,
  };

  const SelectBussinessClasses = {
    selectWrapper: `${style.selectWrapper}`,
    select_headerWrapper: `${style.select_headerWrapper}`,
    select_header: `${style.select_header}`,
    select_options: `${style.select_options}`,
    option: `${style.option}`,
  };

  useEffect(() => {
    if (isGetCompanyInfo && !isLoading && !companyInfo?.name)
      navigate('../account-setup');
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavBarUniversal
            logo={
              <>
                <Link to="/">Abra</Link>
                <span className={style.verticalLine} />
                <span className={style.supplierMainPagelink}>
                  <Link to="/"> SUPPLIER</Link>
                </span>
              </>
            }
          >
            <Link to="/">
              <ButtonLink
                name="Avatar"
                src={bellImg}
                classes={navbarCategoryBtnClasses}
              />
            </Link>
            <Link to="/">
              {companyInfo?.logo_url ? (
                <div className={style.logoImg}>
                  <img src={companyInfo.logo_url} alt="logo" />
                </div>
              ) : (
                <ButtonLink
                  name="logoImg"
                  src={iconImage}
                  classes={navbarCategoryBtnClasses}
                />
              )}
            </Link>
            <Select
              defaultValue={companyInfo?.name}
              img={arrowTriangleImg}
              options={['Name 1', 'Name 2', `${companyInfo?.name}`]}
              classes={SelectBussinessClasses}
            />
          </NavBarUniversal>
          <div className={style.pageWrapper}>
            <SupplierMenu />
            <Outlet />
          </div>
          <FooterForSupplierPart />
        </>
      )}
    </>
  );
};

export default SupplierPage;
