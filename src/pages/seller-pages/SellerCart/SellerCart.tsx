import React, { useEffect, useState } from 'react';

import { OrderDetails } from './OrderDetails';
import { OrderItemsSection } from './OrderItemsSection';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getSellerDataCart, productsInCart } from 'store/reducers/seller/cart';
import { LoaderLinear, Title } from 'ui-kit';

import style from './SellerCart.module.scss';

export const SellerCartPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isFetchingData, setIsFetchingData] = useState(true);

  const productsCart = useAppSelector(productsInCart);
  const totalAmountItems = productsCart.flat(2).length;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(
        getSellerDataCart({
          offset: 0,
          limit: 100,
        }),
      );

      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.order_items}>
          <Title as="h1" weight="bold" className={style.title}>
            My Cart ({totalAmountItems} Items)
          </Title>
          {productsCart?.map((products, index) => {
            return <OrderItemsSection products={products} key={index} />;
          })}
        </div>
        <OrderDetails />
      </div>
      {/* <Title as="h2" size="m" weight="bold" className={style.empty_cart}> */}
      {/*  Unfortunaly, your shopping cart is empty. As soon as you place items in cart */}
      {/*  it will appear here */}
      {/* </Title> */}
      {/* <ProductsPerPage onChange={() => {}} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChanged={setCurrentPage}
      /> */}
    </div>
  );
});
