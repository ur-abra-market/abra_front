import { ArrowIcon } from 'assets/icons';
import hanger from 'assets/images/files/hanger.png';
import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements/Grades/Grades';
import {
  productGradeSelector,
  productTotalOrdersSelector,
  supplierNameSelector,
} from 'store/reducers/productSlice';
import { Title } from 'ui-kit';

import style from './SupplierInfo.module.scss';

export const SupplierInfo = (): JSX.Element => {
  const name = useAppSelector(supplierNameSelector);
  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <div className={style.supplier_info_container}>
      <div className={style.supplier_info}>
        <img className={style.logo} src={hanger} alt="supplier logo" />
        <div className={style.flex_column_container}>
          <Title size="xs">{name || 'Some supplier'}</Title>
          <Grades className={style.grades} grade={grade} count={totalOrders} />
        </div>
      </div>
      <div className={style.arrow}>
        <ArrowIcon />
      </div>
    </div>
  );
};
