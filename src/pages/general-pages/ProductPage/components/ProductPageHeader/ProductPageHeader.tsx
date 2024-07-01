import { useAppSelector } from 'common/hooks';
import { productBreadCrumbsSelector } from 'store/reducers/productSlice/selectors';
import { BreadCrumbs } from 'ui-kit';

import style from './ProductPageHeader.module.scss';

export const ProductPageHeader = (): JSX.Element => {
  const breadCrumbs = useAppSelector(productBreadCrumbsSelector);

  return (
    <div className={style.product_page_wrapper}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
    </div>
  );
};
