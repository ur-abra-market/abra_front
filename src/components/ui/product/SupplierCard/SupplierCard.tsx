import React, { FC } from 'react';

import style from './SupplierCard.module.css';

interface SupplierCardProps {
  supplier: any;
}
const SupplierCard: FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className={style.supplierCard}>
      <div className={style.supplierCard__avatar} />
      <div className={style.supplierCard__info}>
        <div className={style.supplierCard__info_name}>{supplier?.name}</div>
        <div
          className={style.supplierCard__info_deals}
        >{`${supplier?.period} Years : ${supplier?.count} Deals : On-time delivery ${supplier?.value}%`}</div>
      </div>
      <div className={style.supplierCard__arrow} />
    </div>
  );
};

export default SupplierCard;
