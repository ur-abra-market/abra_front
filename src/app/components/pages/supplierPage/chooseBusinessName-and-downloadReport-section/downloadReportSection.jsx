import React from 'react';
import Select from '../../../common/select';
import style from './downloadReportSection.module.css';
import arrowTriangleImg from '../../../../assets/img/icons/check-arrow.png';
import arrowAngleImg from '../../../../assets/img/icons/arrow-down.png';
import { Button } from '../../../common/buttons';

const DownloadReportSection = () => {

    const SelectBussinessClasses = {
        selectWrapper: `${style.selectWrapper}`,
        select_headerWrapper: `${style.select_headerWrapper}`,
        select_header: `${style.select_header}`,
        select_options: `${style.select_options}`,
        option: `${style.option}`,
    };

    const DownloadPeeriodClasses = {
        selectWrapper: `${style.downloadPeeriodWrapper}`,
        select_headerWrapper: `${style.downloadPeeriod_headerWrapper}`,
        select_header: `${style.downloadPeeriod_header}`,
        select_img: `${style.downloadPeeriod_selectImg}`,
        select_options: `${style.downloadPeeriod_selectOptions}`,
        option: `${style.option}`,
    }


    return (
        <div className={style.downloadReportSection}>
            <Select
                defaultName="Business Name"
                img={arrowTriangleImg}
                options={[ "Name 1", "Name 2", "Name 3"]}
                classes={SelectBussinessClasses}
            />
            <div className={style.downloadWrapper}>
                <Select
                    defaultName="Set the period"
                    img={arrowAngleImg}
                    options={[ "Period 1", "Period 2", "Period 3"]}
                    classes={DownloadPeeriodClasses}
                />
                <Button
                    value='Dowload report'
                    className={style.dowloadReport_Btn}
                />
            </div>
        </div>
    )
}

export default DownloadReportSection;