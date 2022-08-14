import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../common/buttons';
import NavBarUniversal from '../../ui/navBarUniversal';
import SupplierMenu from './supplierMenu/supplierMenu';
import iconImage from "../../../assets/img/icons/icon-img.png";
import bellImg from "../../../assets/img/icons/notification-bell.png";
import arrowTriangleImg from '../../../assets/img/icons/check-arrow.png';
import style from "./supplierPage.module.css"
import SupplierSection from './supplierSection/supplierSection';
import Select from '../../common/select';

const SupplierPage = (params) => {
    const [currentMenuItemID, setcurrentMenuItemID] = useState();

    useEffect(() => {
        setcurrentMenuItemID("Dashboard");
    }, []);

    const handleMenuItemSelect = (sectionName) => {
        const sectionNameID = sectionName.split(' ')[0]
        setcurrentMenuItemID(sectionNameID);
    };

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

    return (
        <>
            <NavBarUniversal
                logo={
                    <>
                        <Link to="/">Abra</Link>
                        <span className={style.verticalLine}></span>
                        <span>SUPPLIER</span>
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
                    defaultName="Business Name"
                    img={arrowTriangleImg}
                    options={[ "Name 1", "Name 2", "Name 3"]}
                    classes={SelectBussinessClasses}
                />                
            </NavBarUniversal>
        <div className={style.pageWrapper}>
            <SupplierMenu 
                onMenuItemSelect={handleMenuItemSelect}
                selectedMenuItemID={currentMenuItemID}
            />
            <SupplierSection 
                pageID={currentMenuItemID}
            />
        </div>
        </>
    )
}

export default SupplierPage;
