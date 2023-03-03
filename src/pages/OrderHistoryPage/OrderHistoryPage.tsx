import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Search } from '../../components/ui-kit';
import Header from '../../layouts/Header';

import style from './OrderHistoryPage.module.css';

import Footer from 'layouts/Footer';

type LinkType = 'All' | 'Preparing' | 'In progress' | 'Completed';
type OrderType = {
  number: string;
  date: string;
  status: LinkType;
};

const OrderHistoryPage = (): JSX.Element => {
  const statusLinksList: Array<LinkType> = [
    'All',
    'Preparing',
    'In progress',
    'Completed',
  ];
  const ordersInfo: Array<OrderType> = [
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '19.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '18.12.2022',
      status: 'Completed',
    },
  ];

  const [check, setCheck] = useState<LinkType>('All');
  const [ordersArray, setOrdersArray] = useState<Array<OrderType>>(ordersInfo);

  const handleButtonCategoryClick = (link: LinkType): void => {
    setCheck(link);

    if (link === 'All') setOrdersArray(ordersInfo);
    else {
      const filterOrders = ordersInfo.filter(order => link === order.status);

      setOrdersArray(filterOrders);
    }
  };

  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.main}>
          <div className={style.head}>
            <h2 className={style.title}>Order History</h2>
            <Search className={style.search} placeholder="Search by product name" />
          </div>

          <div className={style.links}>
            {statusLinksList.map(link => (
              <button
                type="button"
                className={cn([style.link], { [style.active]: link === check })}
                onClick={() => handleButtonCategoryClick(link)}
                key={`status_${link}`}
              >
                {link}
              </button>
            ))}
          </div>

          {ordersArray.length ? (
            <ul className={style.list}>
              {ordersArray.map((order, index) => (
                <li key={index} className={style.item}>
                  <div className={style.info}>
                    <h3 className={style.number}>Order No: {order.number}</h3>
                    <p className={style.number}>Total: ...</p>
                    <p className={style.date}>{order.date}</p>
                    <div className={style.details}>
                      <Link to={order.number}>View Details</Link>
                    </div>
                  </div>
                  <div className={style.status}>{order.status}</div>

                  <div className={style.images}>
                    <div className={style.image} />
                    <div className={style.image} />
                    <div className={style.image} />
                    <div className={style.image} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.empty_message}>
              <p>Unfortunately, there are no orders.</p>
              <p>As soon as you place your first order it will appear here</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistoryPage;
