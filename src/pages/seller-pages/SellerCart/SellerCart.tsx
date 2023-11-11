import React from 'react';

import { Link } from 'react-router-dom';

import { OrderDetails } from './OrderDetails';

import { WithLayout } from 'common/hocs/WithLayout';
import { ButtonQuestion, Title } from 'ui-kit';

import style from './SellerCart.module.scss';

export const SellerCart = WithLayout((): JSX.Element => {
  // const dispatch = useAppDispatch();
  // const loading = useAppSelector(sellerLoadingSelector);
  // const { personalInfoLoading } = useAppSelector(userLoadingSelector);
  // const { notificationsLoading, ...restLoading } = loading;
  // const [isFetchingData, setIsFetchingData] = useState(true);
  // const arr = [];
  //
  // const exampleCount = 24;

  // for (let i = 0; i < exampleCount; i += 1) {
  //   arr.push('item');
  // }
  // const isLoading =
  //   Object.values(restLoading).some(value => value === LoadingStatusEnum.Loading) ||
  //   personalInfoLoading === LoadingStatusEnum.Loading;
  //
  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     dispatch(getSellerDataCart());
  //     setIsFetchingData(false);
  //   };
  //
  //   fetchData();
  // }, [dispatch]);

  return (
    <div className={style.wrapper}>
      {/* {isLoading && <LoaderLinear />} */}
      <Title as="h1" weight="bold" className={style.title}>
        My Cart ({3} Items)
      </Title>
      <div className={style.content}>
        <ul className={style.order_list}>
          <li className={style.order_list_item}>
            <div className={style.product_info}>
              <div className={style.name}>
                {/* <img src='' /> */}
                <p>4.1</p>
                <p>Ningbo Beilun Lonsyne</p>
                <span className={style.arrow} />
              </div>
              <div className={style.description}>
                <div className={style.image} />
                <div>
                  <Title>
                    Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                    Clothes
                  </Title>
                  <div className={style.properties}>
                    <p>Color: Silver</p>
                    <p>Status: Shipped</p>
                    <p>Quantity: 200</p>
                  </div>
                  <div className={style.price}>
                    <p>$780</p>
                    <div className={style.price_details}>
                      <p>300pcs</p>
                      <span className={style.line} />
                      <p className={style.old_price}>$4.2/1pcs</p>
                      <p className={style.new_price}>$4.0/1pcs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.track_info}>
              <p>
                Track No: <Link to="/#">JKFRIU548694LLJE</Link>
              </p>
              <span />
              <p>Estimated delivery: 27.07.2022</p>
              <span />
              <p>Delivery method: Abra Shipment</p>
            </div>
          </li>
          <li className={style.order_list_item}>
            <div className={style.product_info}>
              <div className={style.name}>
                {/* <img src='' /> */}
                <p>4.1</p>
                <p>Ningbo Beilun Lonsyne</p>
                <span className={style.arrow} />
              </div>
              <div className={style.description}>
                <div className={style.image} />
                <div>
                  <Title>
                    Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                    Clothes
                  </Title>
                  <div className={style.properties}>
                    <p>Color: Silver</p>
                    <p>Status: Shipped</p>
                    <p>Quantity: 200</p>
                  </div>
                  <div className={style.price}>
                    <p>$780</p>
                    <div className={style.price_details}>
                      <p>300pcs</p>
                      <span className={style.line} />
                      <p className={style.old_price}>$4.2/1pcs</p>
                      <p className={style.new_price}>$4.0/1pcs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.track_info}>
              <p>
                Track No: <Link to="/#">JKFRIU548694LLJE</Link>
              </p>
              <span />
              <p>Estimated delivery: 27.07.2022</p>
              <span />
              <p>Delivery method: Abra Shipment</p>
            </div>
          </li>
        </ul>

        <OrderDetails />
      </div>

      <div className={style.bottom}>
        <ButtonQuestion />
      </div>
    </div>
  );
});
