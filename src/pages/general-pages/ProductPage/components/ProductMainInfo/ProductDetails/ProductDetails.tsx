import React, { useState } from 'react';

import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  AboutProduct,
  FavoriteButton,
  ProductDescription,
  ProductFeedback,
  ProductParams,
  ProductPrice,
  SupplierInfo,
} from 'elements';
import Modal from 'elements/Modal';
import { Bundles } from 'pages/general-pages/ProductPage/components/Bundles/Bundles';
import { CART } from 'routes';
import {
  favoriteProductSelector,
  productDescriptionSelector,
  productNameSelector,
} from 'store/reducers/productSlice';
import {
  addFavoriteProductPage,
  removeFavoriteProductPage,
} from 'store/reducers/productSlice/thunks';
import { addToCart, getSellerCartData } from 'store/reducers/seller/cart/thunks';
import { Button, Paragraph, SimpleLink, Title } from 'ui-kit';
import { ButtonWithLoader } from 'ui-kit/buttons/ButtonWithLoader/ButtonWithLoader';

import style from './ProductDetails.module.scss';

export const ProductDetails = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(productNameSelector);
  const description = useAppSelector(productDescriptionSelector);
  const selectedBundle = useAppSelector(state => state.product.selectedBundle);
  const propertyInfo = useAppSelector(state => state.product.productCard);
  const isBundle = selectedBundle.bundle.pickable_variations.length > 0;
  const { productId } = useParams<string>();
  const isFavorite = useAppSelector(favoriteProductSelector);
  const [amount, setAmount] = useState<string | number>(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bundleVariationPodId, setBundleVariationPodId] = useState<null | number>(null);

  const handleChangeFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProductPage({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProductPage({ product_id: Number(productId) }));
    }
  };

  const handleAddToCart = async (): Promise<void> => {
    setIsLoading(true);
    await dispatch(
      addToCart({
        bundle_variation_pod_id: bundleVariationPodId as number,
        amount: Number(amount),
      }),
    );
    setIsLoading(false);
    setIsOpenModal(true);
    setAmount(1);
    dispatch(getSellerCartData({}));
  };

  const handleCloseModal = (): void => {
    setIsOpenModal(false);
  };

  return (
    <div className={style.product_details_container}>
      <div className={cn(style.section)}>
        <Title className={style.product_title}>{title}</Title>
        <FavoriteButton
          isFavorite={isFavorite}
          onChange={handleChangeFavorite}
          variant="product"
          className={style.favorite_button}
        />
        <Bundles />
        {isBundle && (
          <>
            <ProductParams setBundleVariationPodId={setBundleVariationPodId} />
            <ProductPrice count={amount} setCount={setAmount} />
            {!isLoading ? (
              <Button
                onClick={handleAddToCart}
                disabled={!amount || !bundleVariationPodId}
              >
                Add to Cart
              </Button>
            ) : (
              <ButtonWithLoader className={style.loader_button} />
            )}
          </>
        )}
      </div>
      <SupplierInfo />
      <AboutProduct propertyInfo={propertyInfo.property_types} />
      <ProductFeedback />
      <ProductDescription description={description} />

      <Modal showModal={isOpenModal} closeModal={handleCloseModal}>
        <div className={style.modal_content}>
          <Paragraph size="m" weight="semi_bold">
            Product has been added to cart
          </Paragraph>
          <div className={style.modal_buttons}>
            <SimpleLink color="default" to={CART} variant="button">
              Go to Shopping cart
            </SimpleLink>
            <Button color="light-red" onClick={handleCloseModal}>
              Continue shopping
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
