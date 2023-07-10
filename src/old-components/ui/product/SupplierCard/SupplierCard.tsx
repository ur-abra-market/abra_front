import { FC } from 'react';

import style from './SupplierCard.module.scss';

import { ArrowIcon } from 'assets/icons'; // 24px

interface SupplierCardProps {
  supplier: any;
}

const SupplierCard: FC<SupplierCardProps> = ({ supplier }): JSX.Element => {
  return (
    <div className={style.supplier_card}>
      <div className={style.supplier_card_avatar} />
      <div className={style.supplier_card_info}>
        <div className={style.supplier_card_info_name}>{supplier?.name}</div>
        <div
          className={style.supplier_card_info_deals}
        >{`${supplier?.period} Years : ${supplier?.count} Deals : On-time delivery ${supplier?.value}%`}</div>
      </div>
      <ArrowIcon className={style.supplier_card_arrow} />
    </div>
  );
};

export default SupplierCard;
