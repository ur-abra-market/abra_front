import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ButtonLink } from '../../common/buttons'
import NavBarUniversal from '../../ui/NavBarUniversal'
import SupplierMenu from '../../ui/SupplierMenu/SupplierMenu'
import iconImage from '../../../assets/img/icons/icon-img.png'
import bellImg from '../../../assets/img/icons/notification-bell.png'
import arrowTriangleImg from '../../../assets/img/icons/check-arrow.png'
import style from './SupplierPage.module.css'
import Select from '../../common/Select'

import FooterForSupplierPart from '../../common/FooterForSupplierPart'
import Loader from '../../common/Loader'
import { getCompanyInfoService } from '../../../store/reducers/supplierSlice'
// import { supplierAccountService } from '../../../store/reducers/supplierAccountSlice'

const SupplierPage = () => {
  const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector((state) => state.supplier.loading)
  const companyInfo = useSelector((state) => state.supplier.companyInfo)

  useEffect(() => {
    dispatch(getCompanyInfoService())
    // dispatch(supplierAccountService())
    setIsGetCompanyInfo(true)
  }, [])

  const navbarCategoryBtnClasses = {
    wrepperBtnImg: `${style.wrepperBtnImg}`,
    btnImg: `${style.btnImg}`,
    btnName: `${style.btnName}`
  }

  const SelectBussinessClasses = {
    selectWrapper: `${style.selectWrapper}`,
    select_headerWrapper: `${style.select_headerWrapper}`,
    select_header: `${style.select_header}`,
    select_options: `${style.select_options}`,
    option: `${style.option}`
  }
  useEffect(() => {
    if (isGetCompanyInfo && !isLoading && !companyInfo?.name)
      navigate('../account-setup')
  }, [isLoading])

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
                <span className={style.verticalLine}></span>
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
              <ButtonLink
                name="Avatar"
                src={iconImage}
                classes={navbarCategoryBtnClasses}
              />
            </Link>
            <Select
              defaultValue={companyInfo?.name}
              img={arrowTriangleImg}
              options={['Name 1', 'Name 2', 'Name 3']}
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
  )
}

export default SupplierPage
