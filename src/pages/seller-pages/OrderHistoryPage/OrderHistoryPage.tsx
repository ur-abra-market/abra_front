import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { WithLayout } from 'common/hocs/WithLayout';
import { Search, Title } from 'ui-kit';

import style from './OrderHistoryPage.module.scss';

type LinkType = 'All' | 'Preparing' | 'In progress' | 'Completed';
type OrderType = {
  number: string;
  date: string;
  status: LinkType;
};

export const OrderHistoryPage = WithLayout((): JSX.Element => {
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

  const handleClickButtonCategory = (link: LinkType): void => {
    setCheck(link);

    if (link === 'All') setOrdersArray(ordersInfo);
    else {
      const filterOrders = ordersInfo.filter(order => link === order.status);

      setOrdersArray(filterOrders);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <div className={style.head}>
          <Title>Order History</Title>
          <Search className={style.search} placeholder="Search by product name" />
        </div>

        <div className={style.links}>
          {statusLinksList.map(link => (
            <button
              type="button"
              className={cn([style.link], { [style.active]: link === check })}
              onClick={() => handleClickButtonCategory(link)}
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
                  <p className={style.number}>Order No: {order.number}</p>
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
  );
});
