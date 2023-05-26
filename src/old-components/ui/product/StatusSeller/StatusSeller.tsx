import { FC } from 'react';

import style from './StatusSeller.module.css';

import { HangerImage } from 'assets/images';
import { StarEmptyIcon, ArrowRightIcon } from 'assets/icons';

interface StatusSellerProps {
  supplierInfo: any;
}
const StatusSeller: FC<StatusSellerProps> = ({ supplierInfo }): JSX.Element => {
  // const {name, grade_average, total_deals} = supplierInfo

  return (
    <div className={style.status_seller}>
      <div className={style.status_seller_basic}>
        <div className={style.status_seller_avatar}>
          <HangerImage />
        </div>
        <div className={style.status_seller_person}>
          <h4 className={style.status_seller_person_name}>{supplierInfo?.name}</h4>
          <div className={style.status_seller_person_reward}>
            <div className={style.status_seller_status}>
              <StarEmptyIcon />
            </div>
            <div className={style.status_seller_numbers}>
              {supplierInfo?.grade_average}
            </div>
            <div className={style.status_seller_deals}>
              <p>{supplierInfo?.total_deals} Deals</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div className={style.statusSeller__deals}> */}
        {/*  <p>{total_deals} Deals</p> */}
        {/* </div> */}
      </div>
      <ArrowRightIcon className={style.status_seller_btn} />
    </div>
  );
};

export default StatusSeller;
