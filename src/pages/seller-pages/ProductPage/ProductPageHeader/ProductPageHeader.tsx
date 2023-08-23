import { useParams } from 'react-router-dom';

import style from './ProductPageHeader.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Grades, BreadCrumbs, Favorite } from 'elements';
import {
  productCategorySelector,
  favoriteProductSelector,
  productGradeSelector,
  productTotalOrdersSelector,
  removeFavoriteProduct,
  addFavoriteProduct,
} from 'store/reducers/productSlice';

export const ProductPageHeader = (): JSX.Element => {
  const { productId } = useParams<string>();
  const { name, parent_id } = useAppSelector(productCategorySelector);
  const isFavorite = useAppSelector(favoriteProductSelector);
  const dispatch = useAppDispatch();

  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  const onChangeIsFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProduct({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProduct({ product_id: Number(productId) }));
    }
  };

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={name} parentId={parent_id} />
        <Grades grade={grade} count={totalOrders} />
        <Favorite
          isFavorite={isFavorite}
          onChange={onChangeIsFavorite}
          variant="product"
        />
      </div>
    </header>
  );
};
