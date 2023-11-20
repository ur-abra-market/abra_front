import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ArrowRight } from 'assets/icons';
import { Paragraph } from 'ui-kit';
import { Star } from 'ui-kit/Stars/Star/Star';

import style from './SupplierInformation.module.scss';

type I = {
  item: any;
};

export const SupplierInformation: FC<I> = ({ item }): JSX.Element => {
  return (
    <div className={style.supplier_information} key={item.id}>
      <Star percent={`${item.supplier.grade_average * 10}%`} sizes="16" />
      <Paragraph size="s2" className={style.supplier_rating}>
        {item.supplier.grade_average}
      </Paragraph>
      <NavLink to="/cart" className={style.supplier_link}>
        <Paragraph size="s2" className={style.supplier_name} key={item.id}>
          {item.supplier.user.first_name} {item.supplier.user.last_name}
        </Paragraph>

        <ArrowRight className={style.arrow} />
      </NavLink>
    </div>
  );
};
