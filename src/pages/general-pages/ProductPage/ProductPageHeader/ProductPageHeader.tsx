import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Grades, BreadCrumbs, FavoriteButton } from 'elements';
import {
  productCategorySelector,
  favoriteProductSelector,
  productGradeSelector,
  productTotalOrdersSelector,
  removeFavoriteProduct,
  addFavoriteProduct,
} from 'store/reducers/productSlice';

import style from './ProductPageHeader.module.scss';

export const ProductPageHeader = (): JSX.Element => {
  const { productId } = useParams<string>();
  const { name, parent_id } = useAppSelector(productCategorySelector);
  const isFavorite = useAppSelector(favoriteProductSelector);
  const dispatch = useAppDispatch();

  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  const handleChangeFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProduct({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProduct({ product_id: Number(productId) }));
    }
  };

  return (
    <div className={style.product_page_wrapper}>
      <BreadCrumbs
        className={style.bread_crumbs}
        categoryName={name}
        parentId={parent_id}
      />
      <Grades className={style.grade} grade={grade} count={totalOrders} />
      <FavoriteButton
        className={style.favorite}
        isFavorite={isFavorite}
        onChange={handleChangeFavorite}
        variant="product"
      />
    </div>
  );
};
